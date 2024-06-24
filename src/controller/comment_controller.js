const { where } = require("sequelize");
const { Post, User, Comment } = require("../models")

module.exports = {

    createComment : async (req, res) => {
        try {
            const post_id = req.params.id;
            const user_id = req._id;
            const {comment} = req.body;

            const post = await Post.findOne({ where: {id: post_id} });
            if (!post) {
                return res.status(404).json({ error: "Post not found" });
            }

            const comments = await Comment.create({
                user_id,
                post_id,
                comment
            })

            return res.status(200).json({message: "Comment Successfully", data: comments});
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    getAllComment: async (req, res) => {
        try {
            const post_id = req.params.id;

            const allComment = await Comment.findAndCountAll({
                where: {
                    post_id: post_id
                }
            })

            const commentPost = await Post.findOne({
                where: {
                    id: post_id
                },
                include: [
                    { model: User }
                ],
            })
            return res.render('comment', {data: {allComment, commentPost}});
            // return res.status(200).json({message: "successfully fetched", data: {allComment, commentPost}});
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    updateComment : async (req, res) => {
        try {
            const comment_id = req.params.id;
            const user_id = req._id;
            const {comment} = req.body;

            const existingComment = await Comment.findOne({ where: {id: comment_id, user_id} });
            if (!existingComment) {
                return res.status(404).json({ error: "comment not found" });
            }

            existingComment.comment = comment;
        
        await existingComment.save();

            return res.status(200).json({message: "Comment updated Successfully", data: existingComment});
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },


    deleteComment: async (req, res) => {
        try {
            const comment_id = req.query.id;
            const user_id = req._id;

            const comments = await Comment.destroy({where: { id: comment_id, user_id}});

            return res.status(200).json({message: "comment Deleted Successfully"});
        } catch (error) {
            return res.status(500).json({error : error.message});
        }
    }

}