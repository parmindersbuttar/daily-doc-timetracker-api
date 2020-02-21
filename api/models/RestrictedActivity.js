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

// eslint-disable-next-line
RestrictedActivity.prototype.toJSON = function() {
  const values = Object.assign({}, this.get());

  return values;
};



module.exports = RestrictedActivity;
