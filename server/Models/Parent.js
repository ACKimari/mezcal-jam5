const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Parent extends Model { }

Parent.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: true,
            },
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        school_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        grade: {
            type: Number,
            allowNull: false,
            validate: {

            }
        },
        student: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'teacher',
    }
);

module.exports = Parent;