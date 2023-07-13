const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const util = require('../util/util')

const validateData = (req, res, next) => {
    let updateFlag = req.url== "/update"?true:false
    const validation = util.validateData(req.body,updateFlag)
    if(!validation.status)return res.status(400).json({ error: validation.error });
    next();
};
// Create a new user
router.post('/register',validateData, usersController.createUser);

// Get all users
router.get('/getAllUser',validateData, usersController.getAllUsers);

// Get a user by ID
router.post('/userLogin',validateData, usersController.userLogin);

// Update a user by ID
router.put('/update',validateData, usersController.updateUser);

// Delete a user by ID
router.delete('/deleteUser',validateData, usersController.deleteUser);



module.exports = router;
