const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class ActivityLog extends Model {}

ActivityLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    currentDate: {
      type: DataTypes.DATE,
      defaultValue: Date.now,
      allowNull: false,
    },
    exercises: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    length: {
      type: DataTypes.INTEGER,
      defaultValue: 30,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "activitylog",
  }
);

module.exports = ActivityLog;
