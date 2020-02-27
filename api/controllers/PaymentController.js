const moment = require("moment");
const nodemailer = require("nodemailer");
const connection = require("../../config/connection");
const StripeApi = connection[process.env.NODE_ENV].stripeApiKey;
const stripe = require("stripe")(StripeApi);
const User = require("../models/User");
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

  const createCharge = async user => {
    const activePaymentMethod = user.PaymentMethods.filter(
      item => item.active === true
    );

    try {
      const stripeProductPlanId = user.Plan.stripePlanId;

      const stripeSuscription = await stripe.subscriptions.create({
        customer: user.stripeCustomerId,
        items: [{ plan: stripeProductPlanId }],
        default_payment_method: activePaymentMethod[0].source,
        trial_period_days: 1
      });

      const expireTrialEpoch = stripeSuscription.current_period_end;

      const expiryTrialDate = moment
        .unix(expireTrialEpoch)
        .format("YYYY-MM-DD HH:mm:ss");

      const updatedUser = await User.update(
        {
          subscriptionId: stripeSuscription.id,
          planExpiryDate: expiryTrialDate
        },
        {
          where: {
            id: user.id
          }
        }
      );

      const newUpdatedUser = await User.findByPk(user.id);

      if (updatedUser[0] > 0) {
        await sendSubscriptionEmail(stripeSuscription, newUpdatedUser, "trial");
      }
      return { result: stripeSuscription };
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
    const user = await User.findByPk(userId);
    const subscriptionId = user.subscriptionId;
    try {
      // Cancel Subscription
      if (value === false) {
        const result = await stripe.subscriptions.del(subscriptionId);
        if (result.hasOwnProperty("id")) {
          await User.update(
            { subscriptionActive: false },
            { where: { id: userId } }
          );

          return res.status(200).json({
            success: true,
            message: "Subscription Canceled Successfully"
          });
        }
      } else {
        // Re-subscribe Subscription
        const subscription = await stripe.subscriptions.retrieve(
          user.subscriptionId
        );

        const updatedSubscription = await stripe.subscriptions.update(
          user.subscriptionId,
          {
            cancel_at_period_end: false,
            items: [
              {
                id: subscription.items.data[0].id,
                plan: subscription.plan.id
              }
            ]
          }
        );

        return res.status(200).json({
          success: true,
          message: "Subscription Re-Subscribed Successfully",
          updatedSubscription
        });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, err: error.raw ? error.raw.message : error });
    }
  };

  return {
    createCustomer,
    createCharge,
    toggleSubscription
  };
};

module.exports = PaymentController;
