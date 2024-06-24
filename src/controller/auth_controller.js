const Joi = require('joi');
const { hashPass, comparePassword, generateToken } = require("../service/helpers/utils");
const { User } = require("../models");
const { where } = require('sequelize');

module.exports = {
    signUp: async (req, res) => {
        try {

            const userSchema = Joi.object({
                name: Joi.string().required(),
                email: Joi.string().email().required(),
                mobile: Joi.string().required(),
                password: Joi.string().required(),
                profile_picture: Joi.string().optional()
            });
            
            const { error, value } = userSchema.validate(req.body);

            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }
            let user = await User.findOne({
                where: {
                    email: value.email
                }
            });

            if (user) return res.status(400).json({ error: "Email Alredy in use" })
            const hash = await hashPass(value.password);
            value.password = hash

            if (req.file) {
                value.profile_picture = '/uploads/' + req.file.filename;
            }

            let newUser = await User.create(value);


            return res.status(200).json({message : "successfully signup" , data : newUser});
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },


    login: async (req, res) => {
        try {
            const userSchema = Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().required(),
            });

            const { error, value } = userSchema.validate(req.body);

            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            let user = await User.findOne({
                where: {
                    email: value.email
                }
            });
            if (!user) return res.status(400).json({ error: "Email not found" })

            const isPass = await comparePassword(value.password, user.password);
            if (!isPass) return res.status(400).json({ error: "Password not match" });

            const token = generateToken(user);
            user.token = token
            await user.save()
            res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000 });


            return res.status(200).json({ message : "successfully login", data : user});
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    logout: async (req, res) => {
        try {

            const user = await User.findOne({
                where: {
                    email: req.email,
                    id: req._id
                }
            })

            user.token = null
            res.clearCookie('token');
            await user.save()
            return res.redirect('/loginscreen')
            // return res.status(200).json({ message : "successfully logout"});
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

}