const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandler");
const chatroomController = require("../controllers/chatroomController");

const auth = require("../middlewares/auth");

router.get(
  "/get-chatroom/:id",
  auth,
  catchErrors(chatroomController.getChatRoom)
);
router.get(
  "/get-chatrooms",
  auth,
  catchErrors(chatroomController.getAllChatrooms)
);
router.post(
  "/create-chatroom",
  auth,
  catchErrors(chatroomController.createChatroom)
);

module.exports = router;
