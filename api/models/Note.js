const Sequelize = require("sequelize");
const bcryptService = require("../services/bcrypt.service");

const sequelize = require("../../config/database");
const DataTypes = Sequelize.DataTypes;

const User = require("./User");
const Activity = require("./Activity");

const hooks = {};

const tableName = "notes";

const Note = sequelize.define(
  "Note",
  {
    title: {
      type: Sequelize.TEXT
    },
    userId: {
      type: Sequelize.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "users",
        key: "id",
        as: "userId"
      }
    }
  },
  { hooks, tableName }
);

// eslint-disable-next-line
Note.prototype.toJSON = function() {
  const values = Object.assign({}, this.get());

  delete values.password;

  return values;
};

module.exports = Note;
