const crypto = require("crypto");
const { sequelize, User } = require("../db");
var jwt = require("jsonwebtoken");
const config = require("../config");

class userController {
  async createUser(req, res) {
    const { name, email, password } = req.body;
    console.log(req.body);
    let hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");
    await sequelize.sync();
    await User.create({
      email: email,
      name: name,
      password: hashedPassword,
    });
    return res.status(201).send("logup");
  }
  async logIn(req, res, next) {
    console.log(req.query);
    const { email, password } = req.query;
    await sequelize.sync();
    await User.findOne({
      where: { email: email },
    }).then((userInfo) => {
      console.log("RESULTING");
      console.log(userInfo.toJSON());
      if (userInfo === null) {
        return res.status(401).send("Invalid email");
      }
      const user = userInfo.toJSON();
      let hashedPassword = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");

      if (hashedPassword !== user.password) {
        return res.status(401).send("Invalid password");
      }
      let token = jwt.sign(
        {
          id: user.id,
          email: email,
          password: hashedPassword,
        },
        config.JWT_SECRET
      );
      return res.json({ token: token });
    });
  }
  catch(error) {
    console.log(error);
  }

  async getUser(req, res, next) {
    const token = jwt.verify(req.query.token, config.JWT_SECRET);
    await sequelize.sync();
    const userInfo = await User.findOne({
      where: { id: token.id },
    });

    const user = userInfo.toJSON();
    console.log(user);
    return res.json({
      id: user.id,
      name: user.name || null,
      avatar: user.avatar || null,
    });
  }
}

module.exports = new userController();
