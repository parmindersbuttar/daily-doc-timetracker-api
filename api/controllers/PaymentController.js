const moment = require("moment");
const nodemailer = require("nodemailer");
const connection = require("../../config/connection");
const StripeApi = connection[process.env.NODE_ENV].stripeApiKey;
const stripe = require("stripe")(StripeApi);
const User = require("../models/User");
const Plan = require("../models/Plan");
const PaymentMethods = require("../models/PaymentMethods");
const EMAIL = connection[process.env.NODE_ENV].emailId;
const EMAILPASSWORD = connection[process.env.NODE_ENV].emailPassword;

const PaymentController = () => {
  const createCustomer = async body => {
    const { card } = body;
    try {
      const customer = await stripe.customers.create({
        email: body.email,
        source: card.id,
        name: body.name,
        address: {
          line1: body.addressLine1 || "510 Townsend St",
          postal_code: body.postalCode || "98140",
          state: body.state || "CA",
          country: body.country || "US"
        }
      });
      return customer;
    } catch (err) {
      return err;
    }
  };

  const createSubscriptionCharge = async user => {
    const activePaymentMethod = user.PaymentMethods.filter(
      item => item.active === true
    );

    try {
      const stripeProductPlanId = user.Plan.stripePlanId;

      const stripeSubscription = await stripe.subscriptions.create({
        customer: user.stripeCustomerId,
        items: [{ plan: stripeProductPlanId }],
        default_payment_method: activePaymentMethod[0].source
        trial_period_days: 1
      });

      console.log(stripeSubscription.status);
      const expireTrialEpoch = stripeSubscription.current_period_end;

      const expiryTrialDate = moment
        .unix(expireTrialEpoch)
        .format("YYYY-MM-DD HH:mm:ss");

      const updatedUser = await User.update(
        {
          subscriptionId: stripeSubscription.id,
          planExpiryDate: expiryTrialDate,
          premium: true
        },
        {
          where: {
            id: user.id
          }
        }
      );

      const newUpdatedUser = await User.findByPk(user.id);

      if (updatedUser[0] > 0) {
        await sendSubscriptionEmail(
          stripeSubscription,
          newUpdatedUser,
          "trial"
        );
      }
      return { result: stripeSubscription };
    } catch (err) {
      console.log(err);
      return {
        error: !err.raw && err.raw.message ? err.raw.message : err,
        user: user
      };
    }
  };

  const sendSubscriptionEmail = async (data, user, type) => {
    const transporter = await nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: EMAIL,
        pass: EMAILPASSWORD
      }
    });

    await transporter.sendMail({
      from: `"Scotty Lefkowitz" ${EMAIL}`,
      to: user.email,
      subject: "Subscription Payment",
      text: "",
      html: `
        <b> ${
          type === "trial"
            ? "Your Trial Plan expired by " + user.planExpiryDate
            : data.id
            ? "Your Payment for this month has been deducted"
            : "Error : " + data
        }</b>
      `
    });
  };

  const toggleSubscription = async (req, res) => {
    const value = req.body.value;
    const userId = req.token.id;
    const user = await User.findOne({
      where: { id: userId },
      include: [Plan, PaymentMethods]
    });
    const subscriptionId = user.subscriptionId;
    try {
      // Cancel Subscription
      if (value === false) {
        const result = await stripe.subscriptions.del(subscriptionId);
        if (result.hasOwnProperty("id")) {
          await User.update(
            { subscriptionActive: false, premium: false, subscriptionId: null },
            { where: { id: userId } }
          );

          return res.status(200).json({
            success: true,
            msg: "Subscription Canceled Successfully"
          });
        }
      } else {
        // Re-subscribe Subscription
        const stripeNewSubscriptionResult = await createSubscriptionCharge(
          user
        );

        if (stripeNewSubscriptionResult.result) {
          return res.status(200).json({
            success: true,
            msg: "Subscription Activated Successfully"
          });
        } else if (stripeNewSubscriptionResult.error) {
          return res.status(500).json({
            success: false,
            err: error.raw ? error.raw.message : error
          });
        }
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, err: error.raw ? error.raw.message : error });
    }
  };

  const stripePaymentEvents = async (req, res) => {
    let event = req.body;
    try {
      console.log(event.type, event.data.object);
      switch (event.type) {
        case "payment_intent.succeeded":
          const paymentIntent = event.data.object;
          // Then define and call a method to handle the successful payment intent.
          // handlePaymentIntentSucceeded(paymentIntent);
          break;
        case "payment_method.attached":
          const paymentMethod = event.data.object;
          // Then define and call a method to handle the successful attachment of a PaymentMethod.
          // handlePaymentMethodAttached(paymentMethod);
          break;
        // ... handle other event types
        default:
          // Unexpected event type
          return res.status(400).end({ success: false });
      }

      // Return a response to acknowledge receipt of the event
      return res.json({ received: true });
    } catch (err) {
      console.log(err);
    }
  };

  return {
    createCustomer,
    createSubscriptionCharge,
    toggleSubscription,
    stripePaymentEvents
  };
};

module.exports = PaymentController;
