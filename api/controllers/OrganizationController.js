const User = require('../models/User');

const OrganizationController = () => {
    const get = async (req, res) => {
        try {
            const users = await User.findAll({
                where: {
                    UserId: req.token.id
                }
            });
            return res.status(200).json({ users });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    const show = async (req, res) => {
        try {
            const user = await User.findOne({
                where: {
                    id: req.params.userId
                }
            });
            return res.status(200).json({ user });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    
    const update = async (req, res) => {
        const { body, params } = req;
        try {
            
            const user = await User.update({
                name: body.name,
                addressLine1: body.addressLine1,
                postalCode: body.postalCode,
                state: body.state,
                country: body.country,
            }, {
                where: {
                    id: params.userId
                }
            });
            return res.status(200).json({ success: true });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    const create = async (req, res) => {
        const { body, token } = req;
        try {
            let existingUser = await User.findOne({
                where: {
                  email: body.email
                }
              });
      
              if (existingUser) {
                return res.status(400).json({ error: "User with this email address already registered" });
              }
            let password = Math.random().toString(36).substring(7);
            const user = await User.create({
                name: body.name,
                email: body.email,
                password: password,
                premium: true,
                addressLine1: body.addressLine1,
                postalCode: body.postalCode,
                state: body.state,
                country: body.country,
                UserId: token.id
            });
            return res.status(200).json({ success: true });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    const destroy = async (req, res) => {
        try {
            const users = await User.destroy({
                where: {
                    id: req.params.userId
                }
            });
            return res.status(200).json({ success: true });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    return {
        create,
        show,
        get,
        destroy,
        update
    };
};

module.exports = OrganizationController;
