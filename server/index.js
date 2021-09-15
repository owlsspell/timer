const express = require("express");
const app = express();
const port = 7000;
const router = require("./routes/routes");

const { sequelize } = require("./db");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASS,
//   {
//     host: process.env.POSTGRES_HOST || "db-timer",
//     port: process.env.DB_PORT || 5432,
//     dialect: "postgres",
//   }
// );

// class User extends Model {}

// User.init(
//   {
//     // Model attributes are defined here
//     email: {
//       type: DataTypes.STRING,
//     },
//     name: {
//       type: DataTypes.STRING,
//     },
//     password: {
//       type: DataTypes.STRING,
//     },
//     avatar: {
//       type: DataTypes.STRING,
//     },
//     // birthday: {
//     //   type: DataTypes.DATEONLY,
//     //   defaultValue: DataTypes.NOW,
//     //   allowNull: false,
//     // },
//   },
//   {
//     // Other model options go here
//     sequelize, // We need to pass the connection instance
//     modelName: "User", // We need to choose the model name
//     tableName: "users",
//     timestamps: false,
//   }
// );

app.use("/", router);

(async () => {
  await sequelize.sync({ alter: true });
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  // const jane = await User.create({
  //   username: "janedoe",
  //   birthday: new Date(1980, 6, 20),
  // });
  // console.log(jane.toJSON());
})();

// app.post("/user", (req, res) => {});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
