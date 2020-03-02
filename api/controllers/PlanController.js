const Plan = require("../models/Plan");
const connection = require("../../config/connection");
const stripe = require("stripe")(process.env.STRIPESECRETKEY);

const PlanController = () => {
  const createPlan = async (req, res) => {
    const { body } = req;
    try {
      stripeProductPlan = await stripe.plans.create({
        amount: body.price * 100,
        currency: "usd",
        interval: body.validity,
        product: { name: body.name }
      });

      const plan = await Plan.create({
        name: body.name,
        description: body.description,
        price: body.price,
        validity: body.validity,
        feature: body.feature,
        currency: body.currency,
        stripePlanId: stripeProductPlan.id,
        role: body.role
      });

      return res.status(200).json({ success: true, plan });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ success: false, msg: "Internal server error" });
    }
  };

  const getAll = async (req, res) => {
    try {
      const plans = await Plan.findAll();

      return res.status(200).json({ plans });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };
  return {
    createPlan,
    getAll
  };
};

module.exports = PlanController;
