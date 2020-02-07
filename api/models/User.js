const Sequelize = require('sequelize');
const bcryptService = require('../services/bcrypt.service');

const sequelize = require('../../config/database');
const DataTypes = Sequelize.DataTypes;

const hooks = {
  beforeCreate(user) {
    user.password = bcryptService().password(user); // eslint-disable-line no-param-reassign
  },
};

const tableName = 'users';

const User = sequelize.define('User', {
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  password: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  },
  role: {
    type: Sequelize.STRING,
    type: DataTypes.ENUM('admin', 'customer'),
  }
}, { hooks, tableName });

// eslint-disable-next-line
User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.password;

  return values;
};

User.associate = function (models) {
  User.hasMany(models.activities, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
  }),
  User.hasOne(models.notes, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
  })
};

module.exports = User;
