const connection = require("../../config/connection");
const StripeApi = connection[process.env.NODE_ENV].stripeApiKey;
const stripe = require("stripe")(StripeApi);
const User = require("../models/User");
const PaymentMethods = require("../models/PaymentMethods");
const Sequelize = require("sequelize");

const PaymentController = () => {
  // const createCard = async (req, res) => {
  //   const { body, token } = req;

  //   try {
  //     const card = await PaymentMethods.create({
  //       name: body.name,
  //       type: body.type,
  //       active: body.active,
  //       last4: body.last4,
  //       exp_month: body.exp_month,
  //       exp_year: body.exp_year,
  //       brand: body.brand,
  //       UserId: token.id
  //     });

  //     await PaymentMethods.update(
  //       {
  //         active: false
  //       },
  //       {
  //         where: {
  //           id: {
  //             [Op.not]: card.id
  //           }
  //         }
  //       }
  //     );

  //     return res.status(200).json({ card });
  //   } catch (err) {
  //     if (err.name == "SequelizeValidationError") {
  //       return res.status(400).json({
  //         error: err.errors.length ? err.errors[0].message : err.errors
  //       });
  //     } else if (err.name == "SequelizeDatabaseError") {
  //       return res.status(400).json({
  //         error: err.parent.sqlMessage
  //       });
  //     }
  //     return res.status(500).json({ error: err });
  //   }
  // };

  const createCustomer = async body => {
    const { card } = body;
    try {
      const customer = await stripe.customers.create({
        email: body.email,
        source: card.id
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
      stripeProductPlan = await stripe.plans.create({
        amount: user.Plan.price * 100,
        currency: "usd",
        interval: "month",
        product: { name: user.Plan.name }
      });

      const stripeSuscription = await stripe.subscriptions.create({
        customer: user.stripeCustomerId,
        items: [{ plan: stripeProductPlan.id }],
        default_payment_method: activePaymentMethod[0].source
      });

      const updatedUser = await User.update(
        {
          subscriptionId: stripeSuscription.id
        },
        {
          where: {
            id: user.id
          }
        }
      );
      return stripeSuscription;
    } catch (err) {
      console.log(err);
      return {
        error: !err.raw && err.raw.message ? err.raw.message : err,
        user: user
      };
    }
  };

  const cancelSubscription = async (req, res) => {
    const subId = req.body.subscriptionId;
    const userId = req.token.id;
    try {
      const result = await stripe.subscriptions.del(subId);
      if (result.hasOwnProperty("id")) {
        const updatedUser = await User.update(
          { subscriptionActive: false },
          { where: { id: userId } }
        );

        return res.status(200).json({
          success: true,
          message: "Subscription Canceled Successfully",
          updatedUser
        });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, err: error.raw ? error.raw.message : error });
    }
  };

  return {
    createCustomer,
    createCharge,
    cancelSubscription
  };
};

module.exports = PaymentController;
