const Sequelize = require("sequelize");
const sequelize = require("../../config/database");

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

module.exports = Note;
