const { Sequelize, Model, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.POSTGRES_HOST || "db-timer",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
  }
);

class User extends Model {}

User.init(
  {
    // Model attributes are defined here
    email: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    avatar: {
      type: DataTypes.STRING,
    },
    // birthday: {
    //   type: DataTypes.DATEONLY,
    //   defaultValue: DataTypes.NOW,
    //   allowNull: false,
    // },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "User", // We need to choose the model name
    tableName: "users",
    timestamps: false,
  }
);

const Time = sequelize.define(
  "time",
  {
    // Model attributes are defined here
    userId: {
      type: DataTypes.INTEGER,
    },
    memo: {
      type: DataTypes.STRING,
    },
    seconds: {
      type: DataTypes.INTEGER,
    },
    date: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize, // We need to pass the connection instance
    modelName: "Time", // We need to choose the model name
    timestamps: false,
    // Other model options go here
  }
);

module.exports = { sequelize, User, Time };
