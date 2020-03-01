const moment = require("moment");
const { Op } = require("sequelize");
const nodemailer = require("nodemailer");
const url = require("url");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const connection = require("../../config/connection");
const User = require("../models/User");
const Plan = require("../models/Plan");
const Note = require("../models/Note");
const PaymentMethods = require("../models/PaymentMethods");
const Activity = require("../models/Activity");
const authService = require("../services/auth.service");
const bcryptService = require("../services/bcrypt.service");
const PaymentController = require("../controllers/PaymentController");
const EMAIL = connection[process.env.NODE_ENV].emailId;
const EMAILPASSWORD = connection[process.env.NODE_ENV].emailPassword;

const UserController = () => {
  const register = async (req, res) => {
    const { body } = req;
    const { card } = body;
    let token;
    let user;
    let isUserExist;

    if (body.password === body.confirmPassword) {
      try {
        if (!body.email || body.email === "")
          return res.status(500).json({ error: "Invalid Email" });

        isUserExist = await User.findAll({
          where: {
            email: body.email
          },
          include: [Plan, PaymentMethods]
        });

        if (isUserExist.length && isUserExist[0].premium === true) {
          return res.status(400).json({ error: "Email must be unique" });
        }

        const planDetails = await Plan.findByPk(body.planId);
        const userRole = planDetails.role;
        // TODO: Add UerId for Test

        // If not creating by Organization
        if (body.UserId === undefined || body.UserId === null) {
          if (!isUserExist.length) {
            // Create Stripe Customer
            const resultCustomer = await PaymentController().createCustomer(
              body
            );
            if (resultCustomer.hasOwnProperty("id")) {
              // Add user to DB
              user = await User.create({
                name: body.name,
                email: body.email,
                password: body.password,
                planId: body.planId,
                premium: false,
                stripeCustomerId: resultCustomer.id,
                addressLine1: body.addressLine1,
                postalCode: body.postalCode,
                state: body.state,
                country: body.country,
                role: userRole
              });

              token = authService().issue({ id: user.id });

              // Add payment Method to DB
              await PaymentMethods.create({
                name: card.name,
                type: card.type,
                active: 1,
                last4: card.last4,
                exp_month: card.exp_month,
                exp_year: card.exp_year,
                brand: card.brand,
                UserId: user.id,
                source: body.card.id
              });
            } else {
              return res.status(500).json({
                success: false,
                error:
                  "There is some error while saving your card details. Please try after sometime or connect to customer support",
                err: resultCustomer
              });
            }
          }

          try {
            isUserExist = await User.findAll({
              where: {
                email: body.email
              },
              include: [Plan, PaymentMethods]
            });

            // Create Subscription with one Day trial Period
            const stripeSubscriptionResult = await PaymentController().createSubscriptionCharge(
              isUserExist[0]
            );

            console.log("stripeSubscriptionResult", stripeSubscriptionResult);

            if (stripeSubscriptionResult.result) {
              return res.status(200).json({
                success: true,
                token,
                user: isUserExist[0]
              });
            } else if (stripeSubscriptionResult.error) {
              return res.status(500).json({
                success: false,
                error:
                  "There is some error while saving your card details. Please try after sometime or connect to customer support",
                err: stripeSubscriptionResult
              });
            }
          } catch (err) {
            return res.status(500).json({
              success: false,
              error:
                "There is some error while saving your card details. Please try after sometime or connect to customer support",
              err: err
            });
          }
        } else {
          // Create User in Organization with OrganizationID(as UserId)
          try {
            const organizationUser = await User.findAll({
              where: {
                id: body.UserId
              },
              include: [Plan, PaymentMethods]
            });

            const stripeCusId = organizationUser[0].stripeCustomerId;

            // Add user to DB
            user = await User.create({
              name: body.name,
              email: body.email,
              password: body.password,
              planId: body.planId,
              premium: false,
              stripeCustomerId: stripeCusId,
              addressLine1: body.addressLine1,
              postalCode: body.postalCode,
              state: body.state,
              country: body.country,
              role: userRole,
              UserId: body.UserId
            });

            token = authService().issue({ id: user.id });

            // Update Existing Organization Subscription
            const updateSubscriptionResult = await PaymentController().updateOrganizationSubscription(
              user,
              organizationUser[0]
            );

            if (updateSubscriptionResult.result) {
              return res.status(200).json({
                success: true,
                token,
                data: updateSubscriptionResult
              });
            } else if (updateSubscriptionResult.error) {
              return res.status(500).json({
                success: false,
                error:
                  "There is some error while saving your card details. Please try after sometime or connect to customer support",
                err: stripeSubscriptionResult
              });
            }
          } catch (err) {
            return res.status(400).json({
              success: false,
              error: "Internal Server Error",
              err: err
            });
          }
        }
      } catch (err) {
        return res
          .status(500)
          .json({ success: false, error: "Internal Server Error", err: err });
      }
    } else if (body.password !== body.confirmPassword) {
      return res
        .status(400)
        .json({ success: false, error: "Bad Request: Passwords don't match" });
    }
  };

  const login = async (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
      try {
        let user = await User.findAll({
          where: {
            email
          },
          include: [Plan, PaymentMethods]
        });

        if (!user.length) {
          return res.status(400).json({ msg: "Bad Request: User not found" });
        }

        if (bcryptService().comparePassword(password, user[0].password)) {
          const token = authService().issue({ id: user[0].id });
          return res.status(200).json({ token, user: user[0] });
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
      } else if (!user.length) {
        return res.status(401).json({ isvalid: false, err: "Invalid User!" });
      }

      return res.status(200).json({ isvalid: true, user: user[0] });
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
      return await User.findAll({
        where: { id: userId },
        include: [Plan, PaymentMethods],
        attributes: { exclude: ["subscriptionId", "stripeCustomerId"] }
      });
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

        await sendEmail(req, user, resetPasswordToken);

        return res.status(200).json({
          success: true,
          token: resetPasswordToken,
          msg: `Email has been sent on your Email Id`
        });
      } catch (err) {
        console.log(err);
        return res
          .status(500)
          .json({ success: false, error: "Internal server error", err: err });
      }
    }

    return res
      .status(400)
      .json({ success: false, error: "Bad Request: Email is wrong" });
  };

  const sendEmail = async (req, user, resetToken) => {
    const url = getURL(req);
    const transporter = await nodemailer.createTransport({
      service: "gmail",
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: EMAIL,
        pass: EMAILPASSWORD
      }
    });

    const result = await transporter.sendMail({
      from: `"Scotty Lefkowitz" ${EMAIL}`,
      to: user.email,
      subject: "Reset Password Email",
      text: resetToken,
      html: `
        <b><a href='${url}/reset-password/${resetToken}'>Click here to Reset Password</a></b>
      `
    });

    return result;
  };

  const resetPassword = async (req, res) => {
    const { reset_token, password } = req.body;

    if (reset_token && password) {
      try {
        const updatedUser = await User.update(
          { password: password, resetToken: null },
          {
            where: {
              resetToken: reset_token
            },
            individualHooks: true
          }
        );

        if (updatedUser[0] > 0) {
          return res
            .status(200)
            .json({ success: true, msg: "Password Reset Successfully" });
        } else {
          return res.status(500).json({ success: false, msg: "Invalid Token" });
        }
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

  const getURL = req => {
    return url.format({
      protocol: req.protocol,
      host: req.get("host")
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
    sendEmail,
    resetPassword
  };
};

module.exports = UserController;
