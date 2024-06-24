const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



module.exports = {
    hashPass : async (pass) => {
        try {
            const hash = await bcrypt.hash(pass, 10)
            return hash;
        } catch (error) {
            throw new Error('Error Hasing  passwords');
        }
    },


    comparePassword : async (currtPass, userPass) => {
        try {
            const match = await bcrypt.compare(currtPass, userPass);
            return match;
        } catch (error) {
            throw new Error('Error comparing passwords');
        }
    },

    generateToken : (user) => {
        try {
            const token = jwt.sign(
                {
                    email: user.email,
                    userId: user.id
                },
                "abcdefgh",
                {
                    expiresIn: "1d"
                }
            );
            return token;
        } catch (error) {
            throw new Error('Error generating token');
        }
    }
}
