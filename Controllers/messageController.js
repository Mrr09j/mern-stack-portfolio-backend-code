import { CatchAsyncError } from "../Middlewares/CatchAsyncError.js";
import ErrorHandler from "../Middlewares/error.js";
import { Message } from "../Models/messageSchema.js";

export const sendMessage = CatchAsyncError(async (req, res, next) => {
  const { senderName, subject, message } = req.body;
  if (!senderName || !subject || !message) {
    return next(new ErrorHandler("Please fill full form "));
  }
  const data = await Message.create({ senderName, subject, message });
  res.status(200).json({
    success: true,
    message: "Message sent",
    data,
  });
});

export const getAllMessage = CatchAsyncError(async (req, res, next) => {
  const messages = await Message.find();
  if (!messages) {
    return next(new ErrorHandler("No messages found", 404));
  }
  res.status(200).json({
    success: true,
    messages,
  });
});

export const deleteMessages = CatchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const message = await Message.findById(id);
  if (!message) {
    return next(new ErrorHandler("message already deleted", 400));
  }
  await message.deleteOne();
  res.status(200).json({
    success: true,
    message: "message deleted",
  });
});
