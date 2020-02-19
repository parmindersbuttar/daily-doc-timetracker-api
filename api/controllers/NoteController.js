const Note = require('../models/Note');

const NoteController = () => {
    const createNote = async (req, res) => {
        const { body, token } = req;
        try {
            const note = await Note.create({
                title: body.title,
                userId: token.id,
                ActivityId: body.activityId
            });
            return res.status(200).json({ note });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: 'Internal server error' });
        }
    }
    return {
        createNote,
    };
};

module.exports = NoteController;
