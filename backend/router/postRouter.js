import express from 'express';
const router = express.Router();
import isAuthicated from '../middleware/isAuthenticated.js';
import { getMessage, sendMessage } from '../controllers/messageController.js';
import upload from '../middleware/multer.js';
import { addComment, addnewPost, bookmarkPost, deletePost, dislikePost, getAllpost, getCommentsPost, getUserPost, likePost } from '../controllers/postController.js';


router.use(express.json())
router.use(express.urlencoded({extended:true}));

 router.route("/addpost").post(isAuthicated,upload.single("image"),addnewPost);
 router.route("/all").get(isAuthicated,getAllpost);
 router.route("/userpost/all").get(isAuthicated,getUserPost);
 router.route("/:id/like").get(isAuthicated,likePost);
 router.route("/:id/dislike").get(isAuthicated,dislikePost);
 router.route("/:id/comment").post(isAuthicated,addComment);
 router.route("/:id/comment/all").post(isAuthicated,getCommentsPost);
 router.route("/delete/:id").delete(isAuthicated,deletePost);
 router.route("/:id/bookmark").post(isAuthicated,bookmarkPost);

export default router