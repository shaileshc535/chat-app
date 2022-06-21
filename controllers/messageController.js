const mongoose = require("mongoose");
const Message = mongoose.model("Message");

exports.sendMessage = async (req, res) => {
  const { chatroom, user, message } = req.body;

  if (chatroom == "" || chatroom == null || chatroom == undefined) {
    res.json({
      message: "Chatroom id Is Required!",
    });
  }
  if (user == "" || user == null || user == undefined) {
    res.json({
      message: "Users id Is Required!",
    });
  }

  const chatMessage = new Message({
    chatroom,
    user,
    message,
  });

  await chatMessage.save();

  res.json({
    chatMessage,
    message: "Chatroom created!",
  });
};

exports.getUserRooms = async (req, res) => {
  let { id } = req.params;

  const messages = await Message.find({ user: id })
    .populate("chatroom")
    .populate("user")
    .exec();

  res.json({
    messages,
    message: "User Room List Fetch Successfully!",
  });
};
