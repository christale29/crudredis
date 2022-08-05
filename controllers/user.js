const { v4: uuidv4 } = require("uuid");
const {BadRequest} = require('http-errors')
const { createClient } = require("redis");
const client = createClient();

const User = require('../models/user')


const register = async (req, res)=>{
    const token = uuidv4()
    const user = new User(req.body)
    const newUser = await user.save()
    const userData = {
        id: user._id,
        email: user.email,
      };
      await client.connect();
      await client.hSet(token, userData);
      await client.disconnect()
      
    res.status(201).json({
        success: true,
        data: newUser
    })
}

module.exports = {register}