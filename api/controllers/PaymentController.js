const { Op } = require("sequelize");
const connection = require("../../config/connection");
const StripeApi = connection[process.env.NODE_ENV].stripeApiKey;
const stripe = require("stripe")(StripeApi);
const User = require("../models/User");
const PaymentMethods = require("../models/PaymentMethods");

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

  const createCustomer1 = async (req, res) => {
    const { body } = req;

    try {
      let user = await User.findByPk(req.token.id);
      if (user !== null) user = user.toJSON();
      if (user !== null && user.stripeCustomerId === null) {
        const customer = await stripe.customers.create({
          email: body.email
        });

        const updatedUser = await User.update(
          { stripeCustomerId: customer.id },
          { where: { id: user.id } }
        );

        return res.status(200).json({ updatedUser });
      } else if (user !== null) {
        return res
          .status(500)
          .json({ error: "Customer already exist with this Email" });
      } else {
        return res.status(404).json({ error: "User Not Found for this Email" });
      }
    } catch (err) {
      console.log(err);
      return res.json({ error: err });
    }
  };

  return {
    createCustomer,
    createCustomer1
  };
};

module.exports = PaymentController;
