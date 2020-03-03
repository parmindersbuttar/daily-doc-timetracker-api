const moment = require("moment");
const { Op } = require("sequelize");
const nodemailer = require("nodemailer");
const stripe = require("stripe")(process.env.STRIPESECRETKEY);
const User = require("../models/User");
const Plan = require("../models/Plan");
const PaymentMethods = require("../models/PaymentMethods");

const PaymentController = () => {
  const createCustomer = async body => {
    const { card, email, name } = body;
    try {
      const customer = await stripe.customers.create({
        email: email,
        source: card.id,
        name: name
      });
      return customer;
    } catch (err) {
      console.log("error in create stripe customer: ", err);
      return err;
    }
  };

  const createSubscriptionCharge = async (user, selectedPlan, source) => {
    try {
      const stripeSubscription = await stripe.subscriptions.create({
        customer: user.stripeCustomerId,
        items: [{ plan: selectedPlan.stripePlanId }],
        default_payment_method: source,
        trial_period_days: 1
      });

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

      return { result: stripeSubscription };
    } catch (err) {
      console.log("error in create stripe subscription: ", err);
      return err;
    }
  };

  const sendSubscriptionEmail = async (data, user, type) => {
    const { result } = data;
    const amount =
      result && result.id ? (result.plan.amount / 100) * result.quantity : 0;
    const transporter = await nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAILID,
        pass: process.env.EMAILPASSWORD
      }
    });

    await transporter.sendMail({
      from: `"Scotty Lefkowitz" ${process.env.EMAILID}`,
      to: user.email,
      subject: "Subscription Payment",
      text: "",
      html: ` 
        <b> ${
          type === "trial"
            ? "Your Trial Plan expired by " +
              user.planExpiryDate +
              " and Amount " +
              amount +
              " $ will be deducted for Paid Subscription"
            : result && result.id
            ? "Your Payment " + amount + " $ for this month has been deducted"
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
          const cancelUserSub = await User.update(
            {
              subscriptionActive: false,
              premium: MediaStreamTrackAudioSourceNode,
              subscriptionId: null
            },
            {
              where: {
                [Op.or]: [{ id: userId }, { UserId: userId }]
              }
            }
          );

          return res.status(200).json({
            success: true,
            msg: "Subscription Canceled Successfully",
            cancelUserSub
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

  const setwebhookEndpoints = async () => {
    try {
      const isWebHook = await stripe.webhookEndpoints.list();
      if (!isWebHook.data.length) {
        const serverUrl = `${process.env.SERVER_URL}/public/webhook-charge`;
        const createHook = await stripe.webhookEndpoints.create({
          url: serverUrl,
          enabled_events: ["charge.failed", "charge.succeeded"]
        });
        if (createHook.id) {
          console.log("createHookSuccess - Webhook created");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const stripePaymentWebhookEvents = async (req, res) => {
    let event = req.body;
    try {
      console.log(event.type);
      switch (event.type) {
        case "charge.succeeded":
          const paymentIntent = event.data.object;
          handlePaymentIntentSucceeded(paymentIntent);
          break;

        default:
          return res.status(400).end({ success: false });
      }

      // Return a response to acknowledge receipt of the event
      return res.json({ received: true });
    } catch (err) {
      console.log("err");
    }
  };

  const handlePaymentIntentSucceeded = async succeededRes => {
    console.log("Webhook succeededRes.customer", succeededRes.customer);
    const customerDetails = await stripe.customers.retrieve(
      succeededRes.customer
    );

    const email = customerDetails.email;

    //New data of subscription
    const newSubData =
      customerDetails.subscriptions.data[
        customerDetails.subscriptions.total_count - 1
      ];

    const expiryEpoch = newSubData.current_period_end;
    const expiryDate = moment.unix(expiryEpoch).format("YYYY-MM-DD HH:mm:ss");

    if (email && email !== null) {
      const updatedUser = await User.update(
        { planExpiryDate: expiryDate },
        { where: { email: email } }
      );

      const newUpdatedUser = await User.findOne({ where: { email: email } });

      if (updatedUser[0] > 0) {
        await sendSubscriptionEmail(
          { result: newSubData },
          newUpdatedUser,
          "paid"
        );
      }

      console.log(
        "Paid Subscription expiryDate updated",
        updatedUser,
        newSubData
      );
    }
  };

  // const updateOrganizationSubscription = async (newUser, orgUser) => {
  //   // console.log("orgUser", orgUser);
  //   try {
  //     const subscriptionId = orgUser.subscriptionId;
  //     const subscriptionDetails = await stripe.subscriptions.retrieve(
  //       subscriptionId
  //     );

  //     console.log("subscriptionDetails", subscriptionDetails);
  //     const updatedSubscription = await stripe.subscriptions.update(
  //       subscriptionId,
  //       {
  //         quantity: subscriptionDetails.quantity + 1
  //       }
  //     );

  //     console.log("updatedSubscription", updatedSubscription);

  //     const expiryEpoch = updatedSubscription.current_period_end;

  //     const expiryDate = moment.unix(expiryEpoch).format("YYYY-MM-DD HH:mm:ss");

  //     const updatedUser = await User.update(
  //       {
  //         planExpiryDate: expiryDate,
  //         premium: true
  //       },
  //       {
  //         where: {
  //           id: newUser.id
  //         }
  //       }
  //     );

  //     // const newUpdatedUser = await User.findByPk(newUser.id);

  //     // if (updatedUser[0] > 0) {
  //     //   await sendSubscriptionEmail(
  //     //     stripeSubscription,
  //     //     newUpdatedUser,
  //     //     "paid"
  //     //   );
  //     // }

  //     return { result: updatedSubscription };
  //   } catch (err) {
  //     console.log(err);
  //     return {
  //       error: err,
  //       user: newUser,
  //       orgUser: orgUser
  //     };
  //   }
  // };

  return {
    createCustomer,
    createSubscriptionCharge,
    // updateOrganizationSubscription,
    toggleSubscription,
    stripePaymentWebhookEvents,
    setwebhookEndpoints,
    sendSubscriptionEmail
  };
};

module.exports = PaymentController;
