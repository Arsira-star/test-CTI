const bcrypt = require('bcrypt');

exports.encryptPassword = async (inputData) => {
    const text = inputData
    return await new Promise((resolve, reject) => {
        bcrypt.hash(text, 10, (err, hash) => {
            if (err) reject( {error:err});
            else resolve(hash)
        })
    });
}

exports.validateData = (data,flagUpdate)=>{
    if(!data.username)return {status:false,error:"Please input username !"}
    if(!data.password)return {status:false,error:"Please input password !"}
    if(!data.oldpassword && flagUpdate)return {status:false,error:"Please input old password !"}
    if(!data.newpassword && flagUpdate)return {status:false,error:"Please input new password !"}
    return {status:true}
}
