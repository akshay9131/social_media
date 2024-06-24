const {User} = require('../models')


async function loggedInUser(req, res, next) {
    try {
        let token = req.cookies?.token;

        if(!token) return res.json("access deninedd")
            const user = await User.findOne({
                where: {
                   token: token
                }
            })
            if(!user) return res.json("user not found")
            req._id = user.id
            req.email = user.email
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed',
            error: error
        });
    }
}

module.exports = {loggedInUser}