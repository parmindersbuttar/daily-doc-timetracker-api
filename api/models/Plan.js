const Sequelize = require("sequelize");
const sequelize = require("../../config/database");

const hooks = {};

const tableName = "plans";

const Plan = sequelize.define(
  "Plan",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    currency: {
      type: Sequelize.STRING,
      allowNull: false
    },
    validity: {
      type: Sequelize.STRING,
      allowNull: false
    },
    feature: {
      type: Sequelize.STRING
    },
    stripePlanId: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.ENUM("customer", "organization"),
      allowNull: false
    }
  },
  { hooks, tableName }
);

// eslint-disable-next-line
Plan.prototype.toJSON = function() {
  const values = Object.assign({}, this.get());

  delete values.stripePlanId;

  return values;
};

module.exports = Plan;
