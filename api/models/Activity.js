const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const hooks = {

};

const tableName = 'activities';

const Activity = sequelize.define('Activity', {
    title: {
        type: Sequelize.STRING,
    },
    caturedAt: {
        type: Sequelize.DATE,
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
    image:{
        type: Sequelize.STRING
    }
}, { hooks, tableName });

Activity.associate = function (models) {
    Activity.belongsTo(models.users, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
    }),
    Activity.hasOne(models.notes, {
        foreignKey: 'activityId',
        onDelete: 'CASCADE'
    })
};

module.exports = Activity;
