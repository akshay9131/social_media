const { Post, User } = require("../models")


module.exports = {
    createPost: async (req, res) => {

        try {
            const { title, description, only_me } = req.body;
            const user_id = req._id;
            const image = '/uploads/' + req.file.filename;


            const post = await Post.create({ user_id, title, description, image, only_me })

            return res.status(200).json({ message: "post uploaded successfully", data: post });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }

    },

    editPost: async (req, res) => {
        try {
            const post_id = req.params.id;
            const user_id = req._id;
            const { title, description, only_me } = req.body;


            const post = await Post.findOne({ where: { id: post_id, user_id } });
            if (!post) {
                return res.status(404).json({ error: "Post not found" });
            }


            if (title) {
                post.title = title;
            }

            if (description) {
                post.description = description;
            }

            if (only_me) {
                if (only_me) post.only_me = only_me;
            }

            if (req.file) {
                post.image = req.file.path;
            }

            await post.save();

            return res.status(200).json({ message: "Post updated successfully", data: post });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    getAllPost: async (req, res) => {
        try {
            const post = await Post.findAndCountAll({
                include: [
                    { model: User }
                ],
                order: [['created_at', 'DESC']]
            });
            
            const user = await User.findOne({
                where: {
                    id: req._id
                }
            })

            

            return res.render('feed', {data : {
                post,
                user
            }})
            // return res.status(200).json({ message: "fetched posts successfully", data: {post, user} })
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },


    getUserPost: async (req, res) => {
        try {
            const post = await Post.findAndCountAll({
                where: { user_id: req._id },
                include: [
                    { model: User }
                ]
            })


            return res.status(200).json({ message: "fetched posts successfully", data: post })
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    deletePost: async (req, res) => {
        try {
            const post_id = req.query.id;
            const user_id = req._id;

            const post = await Post.destroy({where: { id: post_id, user_id}});

            return res.status(200).json({message: "Post Deleted Successfully"});
        } catch (error) {
            return res.status(500).json({error : error.message});
        }
    }
}