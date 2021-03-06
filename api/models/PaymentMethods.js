const Sequelize = require("sequelize");
const sequelize = require("../../config/database");

const hooks = {};

const tableName = "payment-methods";

const PaymentMethods = sequelize.define(
  "PaymentMethods",
  {
    type: {
      type: Sequelize.STRING,
      allowNull: false
    },
    active: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    last4: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    exp_month: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    exp_year: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    brand: {
      type: Sequelize.STRING,
      allowNull: false
    },
    source: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  { hooks, tableName }
);

// eslint-disable-next-line
PaymentMethods.prototype.toJSON = function() {
  const values = Object.assign({}, this.get());
  
  delete values.source;

  return values;
};

module.exports = PaymentMethods;
