const Sequelize = require("sequelize");
const bcryptService = require("../services/bcrypt.service");
const Note = require("./Note");
const sequelize = require("../../config/database");
const DataTypes = Sequelize.DataTypes;

const hooks = {
  beforeCreate(user) {
    user.password = bcryptService().password(user); // eslint-disable-line no-param-reassign
  }
};

const tableName = "activities";

const User = require("./User");

const Activity = sequelize.define(
  "Activity",
  {
    title: {
      type: Sequelize.STRING
    },
    caturedAt: {
      type: Sequelize.DATE
    },
    image: {
      type: Sequelize.STRING
    },
    windowName: {
      type: Sequelize.STRING
    }
  },
  { hooks, tableName }
);

// eslint-disable-next-line
Activity.prototype.toJSON = function() {
  const values = Object.assign({}, this.get());

  return values;
};

Activity.hasMany(Note);

module.exports = Activity;
