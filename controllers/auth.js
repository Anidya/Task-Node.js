const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()


exports.signup = async (req,res) => {

    const userExists = await User.findOne({email: req.body.email})
    if(userExists)
        return res.status(403).json({error: "User with the email already registered"});

    const user = await new User(req.body)
    await user.save();
    res.status(200).json("Signup Successful. Please login");
}

exports.signin = (req,res) => {

    const {email, password} = req.body
    User.findOne({email}, (err,user)=>{
        if(err || !user)
            return res.status(401).json({error: "User with that email doesnot exist."})
    
        if(!user.authenticate(password))
            return res.status(401).json({error: "Email and password do not match"});

        if(!user.confirmed)
            return res.status(401).json({error: "Email not verfied"});
            
        const token = jwt.sign({_id: user._id},process.env.JWT_SECRET);
        res.cookie("t",token,{expire: new Date()+9999})
        const {_id,name,email,admin} = user
        return res.json({token,user: {_id,name,email,admin}}); 
    })
}
