const Sequelize = require('sequelize');
const bcryptService = require('../services/bcrypt.service');

const sequelize = require('../../config/database');
const DataTypes = Sequelize.DataTypes;

const hooks = {

};

const tableName = 'notes';

const Note = sequelize.define('Note', {
    body: {
        type: Sequelize.TEXT
    },
    userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
            model: 'users',
            key: 'id',
            as: 'userId'
        }
    },
    activityId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
            model: 'activities',
            key: 'id',
            as: 'activityId'
        }
    },
}, { hooks, tableName });

// eslint-disable-next-line
Note.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());

    delete values.password;

    return values;
};

Note.associate = function (models) {
    Note.belongsTo(models.users, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
    }),
        Note.belongsTo(models.activities, {
            foreignKey: 'activityId',
            onDelete: 'CASCADE'
        })
};

module.exports = Note;
