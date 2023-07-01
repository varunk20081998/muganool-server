//this is the model for the post happening in the app
// it have userId ref.
import mongoose from "mongoose";
const postSchema = mongoose.Schema({

    userId:{
        type:String,
        required:true,
    },
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    location:String,
    description: String,
    picturePath: String,
    userPicturePath : String,
   //this is how mongo db saves 'like value' much more efficient to work with.
    likes:{
        type: Map,
        of:Boolean,
    },
    comments:{
        type:Array,
        default:[]
    },
},{timestamps:true})

const Post = mongoose.model('Post',postSchema);

export default Post;

