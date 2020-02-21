const moment = require("moment");
const { Op } = require("sequelize");
var uuid = require("uuid");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Plan = require("../models/Plan");
const Activity = require("../models/Activity");
const authService = require("../services/auth.service");
const bcryptService = require("../services/bcrypt.service");
const Note = require("../models/Note");
const PaymentController = require("../controllers/PaymentController");
const PaymentMethods = require("../models/PaymentMethods");

const UserController = () => {
  const register = async (req, res) => {
    const { body } = req;
    const { card } = body;
    let token;
    let trialPlanDays = 7;
    let expiryDate = null;

    if (body.password === body.confirmPassword) {
      expiryDate = moment(new Date())
        .add(trialPlanDays, "days")
        .toDate();

      try {
        if (!body.email || body.email === "")
          return res.status(500).json({ error: "Invalid Email" });

        const isUserExist = await User.findAll({
          where: {
            email: body.email
          }
        });

        if (isUserExist && isUserExist.length) {
          return res.status(400).json({ error: "Email must be unique" });
        }

        const resultCustomer = await PaymentController().createCustomer(body);

        if (resultCustomer.hasOwnProperty("id")) {
          let user = await User.create({
            name: body.name,
            email: body.email,
            password: body.password,
            planId: body.planId,
            premium: false,
            planExpiryDate: expiryDate,
            stripeCustomerId: resultCustomer.id
          });

          if (user !== null) {
            user = user.toJSON();
          }

          token = authService().issue({ id: user.id });
          const cardResult = await PaymentMethods.create({
            name: card.name,
            type: card.type,
            active: 1,
            last4: card.last4,
            exp_month: card.exp_month,
            exp_year: card.exp_year,
            brand: card.brand,
            UserId: user.id
          });

          // TODO add includes

          if (cardResult && cardResult.id) {
            user["cardId"] = cardResult.id;
          }

          return res.status(200).json({ token, user });
        } else {
          return res.status(500).json({
            error:
              resultCustomer.raw && resultCustomer.raw.message
                ? resultCustomer.raw.message
                : resultCustomer
          });
        }
      } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }

    return res
      .status(400)
      .json({ error: "Bad Request: Passwords don't match" });
  };

  const login = async (req, res) => {
    const { email, password } = req.body;

    // TODO use includes

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
          if (user != null) {
            user = user.toJSON();
            let planDetails = await Plan.findByPk(user.planId);
            if (planDetails != null) planDetails = planDetails.toJSON();
            user["planDetails"] = planDetails;
          }

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
      } else if (user === null) {
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
      if (user != null) {
        user = user.toJSON();
        let planDetails = await Plan.findByPk(user.planId);
        if (planDetails != null) planDetails = planDetails.toJSON();
        user["planDetails"] = planDetails;
      }
      return user;
    } catch (err) {
      return err;
    }
  };

  const recoverPassword = async (req, res) => {
    const { email } = req.body;

    if (email) {
      try {
        const resetPasswordToken = uuid.v4();
        const user = await User.findOne({ where: { email } });

        if (!user) {
          return res
            .status(404)
            .json({ success: false, error: "User not found with this Email" });
        }

        await User.update(
          { resetToken: resetPasswordToken },
          {
            where: {
              email
            },
            individualHooks: true
          }
        );

        return res.status(200).json({
          success: true,
          token: resetPasswordToken,
          msg: `Email has been sent on your Email Id`
        });
      } catch (err) {
        console.log(err);
        return res
          .status(500)
          .json({ success: false, error: "Internal server error" });
      }
    }

    return res
      .status(400)
      .json({ success: false, error: "Bad Request: Email is wrong" });
  };

  const resetPassword = async (req, res) => {
    const { reset_token, password } = req.body;

    if (reset_token && password) {
      try {
        await User.update(
          { password: password, resetToken: null },
          {
            where: {
              resetToken: reset_token
            },
            individualHooks: true
          }
        );

        return res
          .status(200)
          .json({ success: true, msg: "Password Reset Successfully" });
      } catch (err) {
        console.log(err);
        return res
          .status(500)
          .json({ success: false, error: "Internal server error" });
      }
    }

    return res.status(400).json({
      success: false,
      error: "Bad Request: Reset token and Password are required"
    });
  };

  return {
    register,
    login,
    validate,
    getAll,
    getUserDetail,
    getUserActivities,
    recoverPassword,
    resetPassword
  };
};

module.exports = UserController;
