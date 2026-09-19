const threadModel = require('../models/thread.model');
const replyModel = require('../models/reply.model');

const createThread = async(req, res)=>{
    try {
        const userId = req.user.id;
         
        const {title,content,tags,} =req.body;
        if(!title || !content  ){
            return res.status(400).json({message: "Feild is Missing"});
        }
        const newThread = await threadModel.create({title,content,author:userId,tags: tags || []});
        return res.status(201).json({message : "Thread Created" , thread : newThread});        
    } catch (error) {
    console.error("Forum Creation Error:", error);
    return res.status(500).json({ message: "Failed to create thread." });
  }
}
const getAllThreads = async(req, res)=>{
      try {
        const  getThreads = await threadModel.find().sort({createdAt : -1}).populate('author' , 'name');
        return res.status(200).json({getThreads : getThreads});
    } catch (error) {
        console.error("Fetch Threads Error:", error);
    return res.status(500).json({ message: "Failed to fetch threads." });
    }
}

const getThreadById = async(req, res)=>{
      try {
        const singlethread = await threadModel.findById(req.params.id).populate('author' , 'name');
        if(!singlethread){
            return res.status(404).json({ message: "Thread not found." });
        }

        const replies = await replyModel.find({threadId : req.params.id}).populate('author', 'name');
                return res.status(200).json({singlethread : singlethread , replies:replies});
    } catch (error) {
        console.error("Fetch Thread Error:", error);
    return res.status(500).json({ message: "Failed to fetch thread details." });
    }
}

const addReply = async(req, res)=>{
      try {
        const {content} = req.body;
        if(!content){
                        return res.status(400).json({ message: "Reply required" });
        }
        const newReply = await replyModel.create({content , threadId:req.params.id , author:req.user.id});
        return res.status(201).json({ message: "Reply added", reply: newReply });
    } catch (error) {
        console.error("Reply Creation Error:", error);
    return res.status(500).json({ message: "Failed to add reply." });
    }
}

module.exports = { createThread, getAllThreads, getThreadById, addReply };