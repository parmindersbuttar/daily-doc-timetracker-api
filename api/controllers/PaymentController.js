const connection = require("../../config/connection");
const StripeApi = connection[process.env.NODE_ENV].StripeApiKey;
const stripe = require("stripe")(StripeApi);
const User = require("../models/User");

const PaymentController = () => {
  const createCustomer = async (req, res) => {
    const { body } = req;
    try {
      let user = await User.findByPk(req.token.id);
      if (user !== null) user = user.toJSON();

      if (user !== null && user.stripeCustomerId === null) {
        const customer = await stripe.customers.create({
          email: body.email,
          name: body.name || "",
          phone: body.phone || ""
        });

        const updatedUser = await User.update(
          { stripeCustomerId: customer.id },
          { where: { id: user.id } }
        );

        return res.status(200).json({ updatedUser });
      } else if (user !== null) {
        return res
          .status(500)
          .json({ error: "Customer already exists with this Email" });
      } else {
        return res.status(404).json({ error: "User Not Found for this Email" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  return {
    createCustomer
  };
};

module.exports = PaymentController;
