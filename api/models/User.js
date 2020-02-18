const Sequelize = require("sequelize");
const bcryptService = require("../services/bcrypt.service");

const sequelize = require("../../config/database");
const DataTypes = Sequelize.DataTypes;

const hooks = {
  beforeCreate(user) {
    user.password = bcryptService().password(user); // eslint-disable-line no-param-reassign
  }
};

const tableName = "users";

const Activity = require("./Activity");
const Plan = require("./Plan");

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
    planId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: "CASCADE",
      references: {
        model: "plans",
        key: "id",
        as: "planId"
      }
    }
  },
  { hooks, tableName }
);

// eslint-disable-next-line
User.prototype.toJSON = function() {
  const values = Object.assign({}, this.get());

  delete values.password;

  return values;
};

User.hasMany(Activity, {
  foreignKey: "UserId"
});

module.exports = User;
