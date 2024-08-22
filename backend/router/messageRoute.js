import express from 'express';
const router = express.Router();
import isAuthicated from '../middleware/isAuthenticated.js';
import { getMessage, sendMessage } from '../controllers/messageController.js';


router.use(express.json())
router.use(express.urlencoded({extended:true}));

router.route("/send/:id").post(isAuthicated,sendMessage);
router.route("/all/:id").get(isAuthicated,getMessage);


export default router