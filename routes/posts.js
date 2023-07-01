import express from 'express'
import {verifyToken} from '../middleware/auth.js'
import {getFeedPosts, getUserPosts, likePost} from '../controllers/posts.js';



const router = express.Router();

//read
//curate every posts in the database.
router.get('/',verifyToken,getFeedPosts);

//involving user id 
router.get('/:userId/posts',verifyToken,getUserPosts)

//update
router.patch('/:id/like',verifyToken,likePost); 



export default router;