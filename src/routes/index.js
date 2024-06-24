const multer = require('multer');
const path = require('path');
const { signUp, login, logout, getUserProfile } = require('../controller/auth_controller');
const { createPost, getAllPost, getUserPost, editPost, deletePost } = require('../controller/post_controller');
const { loggedInUser } = require('../middleware/auth_middleware');
const upload = require('../middleware/upload_middleware');
const { createComment, updateComment, deleteComment, getAllComment } = require('../controller/comment_controller');

const router = require('express').Router();
router.get('/', (req, res) => {
    res.render('home');
})

router.get('/loginscreen', (req, res) => {
    res.render('login');
})

router.get('/feed', (req, res) => {
    res.render('feed');
})

router.get('/create-screen', (req, res) => {
    res.render('create_post');
})

router.get('/comment-screen', (req, res) => {
    res.render('comment');
})

router.post('/sign-up',upload.single('profile_picture'), signUp);
router.post('/login', login);
router.get('/logout', loggedInUser, logout);

router.post('/create-post', loggedInUser, upload.single('image'), createPost);
router.put('/edit-post/:id', loggedInUser, upload.single('image'), editPost);
router.get('/all-post', loggedInUser ,getAllPost);
router.get('/get-user-post', loggedInUser, getUserPost);
router.get('/delete-post', loggedInUser, deletePost);

router.post('/create-comment/:id', loggedInUser, createComment);
router.put('/edit-comment/:id', loggedInUser, updateComment);
router.get('/delete-comment', loggedInUser, deleteComment);
router.get('/all-comment/:id', getAllComment);

router.get('*' , (req, res) => {
    res.render('error');
})

module.exports = router;