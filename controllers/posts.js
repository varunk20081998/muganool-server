import Post from '../models/Posts.js';
import User from '../models/User.js';

export const createPost = async (req,res)=>{
    try{
        const {userId, description, picturePath} = req.body;
        
        const user = await User.findById(userId);

        const newPost = new Post({
            userId,
            firstName:user.firstName,
            lastName:user.lastName,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes:{},
            comments:[] 
        })
        await newPost.save();

        const posts = await Post.find({})

        res.status(201).json(posts)
    }
    catch(e){
        res.status(409).json({msg:e.message})
    }

}

export const getFeedPosts = async(req,res)=>{
try{
    const posts = await Post.find({})

        res.status(200).send(posts)
}
catch(e){
    res.status(404).json({msg:e.message})
}
}

export const getUserPosts = async(req,res)=>{
    try{
        const {userId} = req.params
        const posts  = await Post.find({userId: userId})

        res.status(200).json(posts)
    }
    catch(e){
        res.status(404).json({msg:e.message})
    }
    }


export const likePost = async(req,res)=>{
        try{
            const {id} = req.params; 
            const {userId } = req.body;
            console.log('start ------------------ ',id,userId)
            //modifying the earlier map and adding or removing user action in particular map..
            const post = await Post.findById(id)
            console.log('post............',post)
            const isLiked = post.likes.get(userId);
            console.log(isLiked)
            if(isLiked){
                post.likes.delete(userId)
            }
            else{
                post.likes.set(userId,true)
            }
            const updatedPost = await Post.findByIdAndUpdate(id, {likes: post.likes},{new:true});
            res.status(200).json(updatedPost);

        }
        catch(e){
            res.status(500).json({msg:e.message})
        }
        }



// map has a set of pre defined func

//set 
//delete
//get
//etc..