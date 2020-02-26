const Sequelize = require("sequelize");
const bcryptService = require("../services/bcrypt.service");
const sequelize = require("../../config/database");
const DataTypes = Sequelize.DataTypes;
const Activity = require("./Activity");
const Plan = require("./Plan");
const PaymentMethods = require("./PaymentMethods");

const hooks = {
  beforeCreate(user) {
    user.password = bcryptService().password(user);
  },
  beforeUpdate(user, options) {
    user.password = bcryptService().password(user);
  }
};

const tableName = "users";

const User = sequelize.define(
  "User",
  {
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    password: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.STRING,
      type: DataTypes.ENUM("admin", "customer")
    },
    planExpiryDate: {
      type: Sequelize.DATE,
      defaultValue: null
    },
    premium: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    stripeCustomerId: {
      type: Sequelize.STRING
    },
    resetToken: {
      type: Sequelize.STRING
    },
    subscriptionId: {
      type: Sequelize.STRING
    },
    subscriptionActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  },
  { hooks, tableName }
);

// eslint-disable-next-line
User.prototype.toJSON = function() {
  const values = Object.assign({}, this.get());

  delete values.password;
  delete values.resetToken;
  delete values.stripeCustomerId;

  return values;
};

User.hasMany(Activity, {
  foreignKey: "UserId"
});

User.hasMany(PaymentMethods, {
  foreignKey: "UserId"
});

User.belongsTo(Plan, {
  foreignKey: {
    name: "planId"
  }
});

module.exports = User;
