const Sequelize = require("sequelize");
const bcryptService = require("../services/bcrypt.service");
const sequelize = require("../../config/database");

const hooks = {};

const tableName = "plans";

const Plan = sequelize.define(
  "Plan",
  {
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.FLOAT
    },
    currency: {
      type: Sequelize.STRING
    },
    validity: {
      type: Sequelize.INTEGER
    }
  },
  { hooks, tableName }
);

module.exports = Plan;
