const Sequelize = require("sequelize");
const sequelize = require("../../config/database");

const hooks = {};

const tableName = "restricted-activities";

const RestrictedActivity = sequelize.define(
  "RestrictedActivity",
  {
    name: {
      type: Sequelize.STRING
    }
  },
  { hooks, tableName }
);

module.exports = RestrictedActivity;
