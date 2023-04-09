const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// @desc        register a user
// @route       POST /api/users
// @access      Public
const registerUser = asyncHandler( async(req, res)=>{
    //we need to encrypt our passwords in the db, so we use (bcryptjs)
    const {name, email, password } = req.body;
    if( !name || !email || !password){
        res.status(400);
        throw new Error('Plz fill in all the fields first');
    }

    // check if user exists in db
    const userExists = await User.findOne({email});
    if( userExists){
        res.status(400);
        throw new Error('User already exists');
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create the user data for the mongodb
    const user = await User.create({
        name, 
        email,
        password: hashedPassword
    });

    if( user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400);
        throw new Error('invalid user data. register again!!!');
    }

});


// @desc        authenticate a user
// @route       POST /api/users/login
// @access      Public
const loginUser = asyncHandler( async(req, res)=>{
    const {email, password} = req.body;

    const userExists = await User.findOne({email});
    if( userExists && (await bcrypt.compare(password, userExists.password))){
        res.status(200).json({
            _id: userExists._id,
            name: userExists.name,
            email: userExists.email,
            token: generateToken(userExists._id)
        });
    }else{
        res.status(400);
        throw new Error('invalid user credentials. Try Logging Again')
    }

});


// @desc        get user data
// @route       POST /api/users/me
// @access      Private
const getMe = asyncHandler( async(req, res)=>{

    // the ist time we login, we dont have any jwt token, instead 
    // on the ist login, the server sends back the token as a response
    // (check the response of registerUser & loginUser)
    // now this jwt token is stored in our localstorage or sessionstorage
    // (we can set expiry dates too.. see generateToken function)
    // the next time we login , the user data(excluding the password
    // is present in the request headers( more specifically in our case,
    // the 'req.user'))
     // console.log(req.user);
    const {_id, name, email} = req.user; 
    res.status(200).json({
        id: _id,
        name,
        email
    })

})



// generate a token (JWT)
const generateToken = (id)=>{  // id is the user {_id} in the db
    return jwt.sign({ id}, process.env.JWT_SECRET, {expiresIn: '30d'});
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}