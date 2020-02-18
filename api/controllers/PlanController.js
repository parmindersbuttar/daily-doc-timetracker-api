const Plan = require("../models/Plan");

const PlanController = () => {
  const createPlan = async (req, res) => {
    const { body, token } = req;
    console.log(body);
    try {
      const plan = await Plan.create({
        name: body.name,
        description: body.description,
        price: body.price,
        validity: body.validity
      });
      return res.status(200).json({ plan });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
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
