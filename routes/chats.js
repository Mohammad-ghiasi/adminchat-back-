const express = require("express");

const {createRoom, findRoomByUserId} = require('../controllers/chatController')
const router = express.Router();



router.get('/find-chatRoom/:userId', findRoomByUserId);

module.exports = router;