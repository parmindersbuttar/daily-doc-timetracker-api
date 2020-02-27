const Sequelize = require("sequelize");
const bcryptService = require("../services/bcrypt.service");
const Note = require("./Note");
const sequelize = require("../../config/database");

const hooks = {
  beforeCreate(user) {
    user.password = bcryptService().password(user); // eslint-disable-line no-param-reassign
  }
};

const tableName = "activities";

const Activity = sequelize.define(
  "Activity",
  {
    title: {
      type: Sequelize.STRING
    },
    capturedAt: {
      type: Sequelize.DATE
    },
    image: {
      type: Sequelize.STRING
    },
    windowName: {
      type: Sequelize.STRING
    },
    points: {
      type: Sequelize.FLOAT
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
