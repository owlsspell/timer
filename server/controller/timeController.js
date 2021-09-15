const { sequelize, Time } = require("../db");

class timeController {
  async sendTime(req, res) {
    console.log(req.body);
    const { time, memo, id, date } = req.body;
    await sequelize.sync({ alter: true });
    console.log(date);
    console.log("user = " + id);
    await Time.findOne({ where: { memo, userId: id, date: date } }).then(
      (line) => {
        // console.log(line);
        if (!line) {
          Time.create({
            userId: id,
            memo: memo,
            seconds: time,
            date: date,
          });
          res.end();
        } else {
          line.update({ ...line, miliseconds: line.miliseconds + time });
          res.end();
        }
      }
    );

    // console.log(recordExists.toJSON());
    // if (!recordExists) {
    // await Time.create({
    //   userId: id,
    //   memo: memo,
    //   miliseconds: time,
    // });
    // }
  }
  async getStatistics(req, res) {
    console.log("QUERY");
    console.log(req.query.id);
    await Time.findAll({ where: { userId: req.query.id } }).then((line) => {
      // console.log(line);
      res.json(line);
    });
  }

  async getStatisticsByDates(req, res) {
    console.log(req.query);
    await sequelize
      .query(
        `SELECT * FROM times WHERE date>=${req.query.from} AND date<=${req.query.to};`
      )
      .then((results) => res.json(results[0]));
  }
}

module.exports = new timeController();
