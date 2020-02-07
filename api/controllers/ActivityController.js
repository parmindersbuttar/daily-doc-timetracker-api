
const Activity = require('../models/Activity');
const authService = require('../services/auth.service');
const fs = require('fs');
const uuidv4 = require('uuid/v4');
const path = require('path');

const ActivityController = () => {

    const createActivity = async (req, res) => {
        const { body, token } = req;
        try {
            const image = req.body.image;
            const directory = path.join(__dirname + `/../uploads/users/${token.id}`);
            const filename = uuidv4() + '.png';
            const filepath = path.join(directory + '/' + filename);
            const url = `/users/${token.id}/${filename}`
            if (!fs.existsSync(directory)) {
                fs.mkdirSync(directory);
            }
            fs.writeFile(filepath, image.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64', async (err) => {
                if (err) console.log(err);
                const activity = await Activity.create({
                    title: body.email,
                    caturedAt: body.capturedAt,
                    userId: token.id,
                    image: url,
                });
                if (!activity) {
                    return res.status(400).json({ msg: 'Bad Request: Activity creation failed' });
                }
                return res.status(200).json({ activity });
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: 'Internal server error' });
        }
    };
    return {
        createActivity
    };
};

module.exports = ActivityController;
