const express = require("express");
const app = express();
const port = 7000;
require("dotenv").config();

const { Sequelize, Model, DataTypes } = require("sequelize");
// const sequelize = new Sequelize(
//   "postgres://" +
//     process.env.DB_USER +
//     ":" +
//     process.env.DB_PASS +
//     "@" +
//     process.env.POSTGRES_HOST || db + ":5432/" + process.env.DB_NAME
// );
// process.env.DB_NAME,
// process.env.DB_USER,
// process.env.DB_PASS,
const sequelize = new Sequelize("timer_db", "developer", "123456", {
  host: "db-timer",
  port: 5432,
  dialect: "postgres",
});

(async () => {
  await sequelize.sync();
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

app.post("/user", (req, res) => {});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
