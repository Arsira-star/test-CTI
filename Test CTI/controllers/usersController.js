const User = require('../models/User');
const util = require('../util/util')

// Create a new user
exports.createUser = async (req, res) => {
  try {
    let { username, password } = req.body;
    const coverPassword = await util.encryptPassword(password)
    const userData = {username:username,password:coverPassword}
    const user = new User(userData);
    const saveResult = await user.save();
    if(saveResult.error)res.status(500).json({ error: 'Failed to save data' });
    else res.json({status:"success"})
  } catch (error) {
    res.status(500).json({error:"Server Error"})
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const Items = await User.find({});
        if(Items.error)res.status(500).json({ error: 'Failed to get data' });
        else res.json(Items)
    } catch (error) {
        res.status(500).json({error:"Server Error"})
    }
};

// Get a user by ID
exports.userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const query = {username:username,password:util.encryptPassword(password)}
        const resultQuery = await User.find(query,{_id:0});
        if(resultQuery.error)res.status(500).json({ error: 'Failed to get data' });
        else {
            if(resultQuery.length > 0)res.json({status:'Login success'})
            else res.json({status:'Username or password is incorrect'})
        }    
    } 
    catch (error) {
        res.status(500).json({error:"Server Error"})
    }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
    try {
        const { username, oldpassword , newpassword } = req.body;
        const coverOldPassword = await util.encryptPassword(oldpassword)
        const coverNewPassword = await util.encryptPassword(newpassword)
        const queryUpate = {username:username,password:coverOldPassword}
        const updateUser = await User.findOneAndUpdate(queryUpate, {password:coverNewPassword}, { new: false });
        if(updateUser.error)res.status(500).json({ error: 'Failed to update data' });
        else res.json({status:"Update success"})
    } catch (error) {
        res.status(500).json({error:"Server Error"})
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const coverPassword = await util.encryptPassword(password)
        const queryDelete = {username:username,password:coverPassword}
        const deleteUser = await User.findOneAndDelete(queryDelete);
        if(deleteUser.error)res.status(500).json({ error: 'Failed to delete data' });
        else res.json({status:"Delete success"})
    } catch (error) {
        res.status(500).json({error:"Server Error"})
    }
};
