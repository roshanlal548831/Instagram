import express from 'express';
import {editProfile, followeOrUnfollow, getProfile, getSuggestedUsers, login, logout, register } from '../controllers/userController.js';
import isAuthicated from '../middleware/isAuthenticated.js';
import upload from '../middleware/multer.js';
const router = express.Router();

router.use(express.json())
router.use(express.urlencoded({extended:true}));

router.route("/register").post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/:id/profile').get(isAuthicated,getProfile);
router.route('/profile/edit').post(isAuthicated,upload.single("profilePicture"),editProfile);
router.route('/suggested').get(isAuthicated,getSuggestedUsers);
router.route('/followorunfollow/:id').post(isAuthicated,followeOrUnfollow);



export default router