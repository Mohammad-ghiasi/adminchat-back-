const express = require("express");

const {createRoom, findRoomByUserId, createMessage, getAllRooms, setNewMessageFlags} = require('../controllers/chatController')
const router = express.Router();



router.post('/add-chatRoom', createRoom);
router.post('/add-message', createMessage);
router.post('/setNewMessageFlags', setNewMessageFlags);
router.get('/find-chatRoom/:userId', findRoomByUserId);
router.get('/getAllRooms', getAllRooms);

module.exports = router;