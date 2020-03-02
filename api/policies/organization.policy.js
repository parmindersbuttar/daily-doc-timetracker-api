const User = require('../models/User');

// usually: "Authorization: Bearer [token]" or "token: [token]"
module.exports = async (req, res, next) => {
   
    let user = await User.findOne({
        where: {
          id: req.token.id
        }
      });
    if (user && user.role.toLowerCase() === 'organization') {
        return next();
    } else {
        return res.status(401).json({ error: 'You are not authorize to perform this action' });
    }
};
