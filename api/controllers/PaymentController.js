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
        source: (card && card.id) || ""
      });
      return customer;
    } catch (err) {
      return err;
    }
  };

  const createCharge = async user => {
    try {
      const paymenDetail = {
        amount: user.Plan.price * 100,
        currency: "USD",
        source: user.PaymentMethods[0].source,
        description: "My First Test ",
        customer: user.stripeCustomerId
      };
      const charges = await stripe.charges.create(paymenDetail);
      console.log(charges);

      return charges;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  return {
    createCustomer,
    createCharge
  };
};

module.exports = PaymentController;
