import { populate } from "dotenv";
import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { getReceiverSockeId, io } from "../shocket/sockt.js";

export const sendMessage = async (req,res) =>{
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const {textMessage:message} = req.body;

        let conversation = await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        });

        // establish the conversation if not started yet.
        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId,receiverId]
            })
        };

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });

        if(newMessage) conversation.message.push(newMessage._id);

        await Promise.all([conversation.save(),newMessage.save()]);

    //    imlement WebSocket.io real data transfer

    const receiverSocketId = getReceiverSockeId(receiverId);

    if(receiverSocketId){
       io.to(receiverSocketId).emit("newMessage",newMessage)
    }

        return res.status(201).json({
            success:true,
            newMessage
        })

    } catch (error) {
        console.log(error)
    }
};

export const getMessage = async (req,res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const conversation = await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        }).populate("message")
        if(!conversation) return res.status(200).json({success:true,message:[]})

            return res.status(200).json({success:true,message:conversation?.message});
            
    } catch (error) {
    console.log(error);
    }
}