const express = require("express");

const {createUser, getAllUsers, getUser} = require('../controllers/userController')
const router = express.Router();



router.post('/add-user', createUser);
router.get('/get-allUser', getAllUsers);
router.get('/get-user', getUser);


module.exports = router;