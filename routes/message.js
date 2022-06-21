const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandler");
const messageController = require("../controllers/messageController");

router.post("/message", catchErrors(messageController.sendMessage));
router.get("/message/:id", catchErrors(messageController.getRoomMessages));
router.get("/user-rooms/:id", catchErrors(messageController.getUserRooms));

module.exports = router;
