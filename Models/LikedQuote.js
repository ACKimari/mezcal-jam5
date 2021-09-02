const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class LikedQuote extends Model {}

LikedQuote.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: DataTypes.NULL
    },
    quote: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: DataTypes.NULL
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
      defaultValue: DataTypes.NULL
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'favorites',
  }
);

module.exports = LikedQuote;