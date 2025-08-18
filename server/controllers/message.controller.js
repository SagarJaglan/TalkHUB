import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";
import { io, getSocketId } from "../socket/socket.js";

export const sendMessage = asyncHandler(async (req, res) => {
  const senderId = req.user.id;
  const receiverId = req.params.receiverId;
  const message = req.body.message;

  if (!senderId || !receiverId || !message) {
    return errorHandler("Conversation ID and content are required.", 400);
  }
  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });
    // If conversation does not exist, create a new one
  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
    });
  }
  
    // Create the message
  const newMessage = await Message.create({
    senderId,
    receiverId,
    message,
  });

  // Add the message to the conversation's message array
  if (newMessage) {
    conversation.message.push(newMessage._id);
    await conversation.save();
  }

  // Emit the message to the receiver's socket
  const receiverSocketId = getSocketId(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage",newMessage);
  }

  res.status(201).json({
    success: true,
    message: "Message sent successfully",
    data: newMessage,
  });
});

export const getMessage = asyncHandler(async (req, res) => {
  const myId = req.user.id;
  const otherParticipentId = req.params.otherParticipentId;

  if (!myId || !otherParticipentId) {
    return errorHandler("Conversation ID are required.", 400);
  }

  let conversation = await Conversation.findOne({
    participants: { $all: [myId, otherParticipentId] },
  }).populate("message");
  
 
  res.status(201).json({
    success: true,
    message: "Message fetched successfully",
    data: conversation,
  });
});
