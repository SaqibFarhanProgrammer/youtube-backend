import mongoose from "mongoose"

const userschema = new mongoose.Schema({
    id : {
        type: String 
    }
    , 
    WatchHistory : {
        type: Array,
        default : []
    }
    
})