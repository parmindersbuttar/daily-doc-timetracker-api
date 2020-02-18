const moment = require("moment");
const User = require("../models/User");
const Activity = require("../models/Activity");
const authService = require("../services/auth.service");
const fs = require("fs");
const uuidv4 = require("uuid/v4");
const path = require("path");

const ActivityController = () => {
  const createActivity = async (req, res) => {
    const { body, token, query } = req;

    try {
      const image = req.body.image;
      const directory = path.join(__dirname + `/../uploads/users/${token.id}`);
      const filename = uuidv4() + ".png";
      const filepath = path.join(directory + "/" + filename);
      const url = `/users/${token.id}/${filename}`;
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
      }
      // console.log('check requtest',body)
      fs.writeFile(
        filepath,
        image.replace(/^data:image\/(png|gif|jpeg);base64,/, ""),
        "base64",
        async err => {
          if (err) console.log(err);

          const userId = token.id;
          let currentPoints = 0;
          let prevPoints = 0;
          let currentDate = moment().format("YYYY-MM-DD");

          const userActivities = await Activity.findAll({
            where: {
              userId: userId
            }
          });

          const todayActivities = userActivities.filter(item => {
            if (moment(item.capturedAt).format("YYYY-MM-DD") === currentDate)
              return item;
          });

          prevPoints =
            todayActivities.length &&
            todayActivities[todayActivities.length - 1].points;

          if (
            body.windowName &&
            body.windowName !== null &&
            body.windowName !== "" &&
            (body.windowName.toLowerCase() === "facebook" ||
              body.windowName.toLowerCase() === "messenger")
          ) {
            currentPoints = prevPoints > 0 ? prevPoints - 5 : 0;
          } else {
            currentPoints = prevPoints + 5;
          }
          const activity = await Activity.create({
            title: body.title,
            capturedAt: body.capturedAt,
            UserId: token.id,
            image: url,
            windowName: body.windowName,
            points: currentPoints
          });
          if (!activity) {
            return res
              .status(400)
              .json({ msg: "Bad Request: Activity creation failed" });
          }
          return res.status(200).json({ activity });
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };
  return {
    createActivity
  };
};

module.exports = ActivityController;
