const moment = require('moment')
const { Op } = require('sequelize')
const User = require('../models/User');
const Activity = require('../models/Activity');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');


const UserController = () => {
  const register = async (req, res) => {
    const { body } = req;

    if (body.password === body.confirmPassword) {
      try {
        const user = await User.create({
          email: body.email,
          password: body.password,
        });
        const token = authService().issue({ id: user.id });

        return res.status(200).json({ token, user });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
    }

    return res.status(400).json({ msg: 'Bad Request: Passwords don\'t match' });
  };

  const login = async (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
      try {
        const user = await User
          .findOne({
            where: {
              email,
            },
          });

        if (!user) {
          return res.status(400).json({ msg: 'Bad Request: User not found' });
        }

        if (bcryptService().comparePassword(password, user.password)) {
          const token = authService().issue({ id: user.id });

          return res.status(200).json({ token, user });
        }

        return res.status(401).json({ msg: 'Unauthorized' });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
    }

    return res.status(400).json({ msg: 'Bad Request: Email or password is wrong' });
  };

  const validate = (req, res) => {
    const { token } = req.body;

    authService().verify(token, (err) => {
      if (err) {
        return res.status(401).json({ isvalid: false, err: 'Invalid Token!' });
      }

      return res.status(200).json({ isvalid: true });
    });
  };

  const getAll = async (req, res) => {
    try {
      const users = await User.findAll();

      return res.status(200).json({ users });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const getUserDetail = async (req, res) => {
    try {
      const user = await User.findByPk(req.token.id);
      return res.status(200).json({ user });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  }

  const getUserActivities = async (req, res) => {
    const id = req.token.id;
    const date = moment(new Date()).startOf('day').toDate();
    console.log("^^^^", date, id)
    try {
      const activities = await Activity.findAll({
        where: {
          userId: id,
          createdAt: {
            [Op.gte]: date,
          },
        }
      });;
      return res.status(200).json({ activities });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  }

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
