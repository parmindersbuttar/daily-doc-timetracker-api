const moment = require("moment");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Plan = require("../models/Plan");
const Activity = require("../models/Activity");
const authService = require("../services/auth.service");
const bcryptService = require("../services/bcrypt.service");
const Note = require("../models/Note");

const UserController = () => {
  const register = async (req, res) => {
    const { body } = req;
    let trialPlanDays = 14;
    let expiryDate = null;

    if (body.password === body.confirmPassword) {
      expiryDate = moment(new Date())
        .add(trialPlanDays, "days")
        .toDate();

      try {
        let user = await User.create({
          name: body.name,
          email: body.email,
          password: body.password,
          planId: body.planId,
          premium: false,
          planExpiryDate: expiryDate
        });
        const token = authService().issue({ id: user.id });
        if (user != null) user = user.toJSON();

        let planDetails = await Plan.findByPk(user.planId);
        if (planDetails != null) planDetails = planDetails.toJSON();
        user["planDetails"] = planDetails;

        return res.status(200).json({ token, user });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Internal server error" });
      }
    }

    return res.status(400).json({ msg: "Bad Request: Passwords don't match" });
  };

  const login = async (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
      try {
        let user = await User.findOne({
          where: {
            email
          }
        });

        if (!user) {
          return res.status(400).json({ msg: "Bad Request: User not found" });
        }

        if (bcryptService().comparePassword(password, user.password)) {
          const token = authService().issue({ id: user.id });
          if (user != null) user = user.toJSON();

          let planDetails = await Plan.findByPk(user.planId);
          if (planDetails != null) planDetails = planDetails.toJSON();
          user["planDetails"] = planDetails;

          return res.status(200).json({ token, user });
        }

        return res.status(401).json({ msg: "Unauthorized" });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Internal server error" });
      }
    }

    return res
      .status(400)
      .json({ msg: "Bad Request: Email or password is wrong" });
  };

  const validate = async (req, res) => {
    const { token } = req.body;
    let user = null;
    if (token) {
      const decoded = jwt.decode(token);
      if (decoded.id) {
        user = await fetchUserDetailedData(decoded.id);
      }
    }

    authService().verify(token, err => {
      if (err) {
        return res.status(401).json({ isvalid: false, err: "Invalid Token!" });
      }
      return res.status(200).json({ isvalid: true, user });
    });
  };

  const getAll = async (req, res) => {
    try {
      const users = await User.findAll();

      return res.status(200).json({ users });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  const getUserDetail = async (req, res) => {
    try {
      let user = await fetchUserDetailedData(req.token.id);
      return res.status(200).json({ user });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  const getUserActivities = async (req, res) => {
    const { query, token } = req;
    console.log("query", query);
    const id = token.id;
    const start_date = query.startDate
      ? moment(query.startDate)
      : moment(new Date())
          .startOf("day")
          .toDate();
    const end_date = query.endDate ? moment(query.endDate).add(1, "day") : "";

    let activities = [];
    let noteCount = [];
    try {
      if (end_date) {
        activities = await Activity.findAll({
          where: {
            userId: id,
            createdAt: {
              [Op.gte]: start_date,
              [Op.lte]: end_date
            }
          },
          include: [Note]
        });
      } else {
        activities = await Activity.findAll({
          where: {
            userId: id,
            createdAt: {
              [Op.gte]: start_date
            }
          },
          include: [Note]
        });
      }

      return res.status(200).json({ activities });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  const fetchUserDetailedData = async userId => {
    try {
      let user = await User.findByPk(userId);
      if (user != null) user = user.toJSON();
      let planDetails = await Plan.findByPk(user.planId);
      if (planDetails != null) planDetails = planDetails.toJSON();
      user["planDetails"] = planDetails;
      console.log("hlo");
      return user;
    } catch (err) {
      return err;
    }
  };

  return {
    register,
    login,
    validate,
    getAll,
    getUserDetail,
    getUserActivities
  };
};

module.exports = UserController;
