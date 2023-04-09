const asyncHandler= require('express-async-handler')
const Goal = require('../models/goalModel');
const User = require('../models/userModel');

const getGoals = asyncHandler( async (req, res)=>{
    const goals = await Goal.find({user: req.user.id});
    res.status(200).json(goals);
})



const setGoals = asyncHandler(async (req, res)=>{
    if( !req.body.text){
        res.status(400);
        throw new Error( 'plz add a text field');
    }

    const goal = await Goal.create({
        user: req.user._id,
        text: req.body.text,
    })
    // console.log(goal.text)
    res.status(200).json(goal);
})




const updateGoals = asyncHandler(async(req, res)=>{
    const goal = await Goal.findById(req.params.id);

    if( !goal){
        res.status(400);
        throw new Error('goal not found');
    }
    const user = await User.findById(req.user._id);
    if( !user){
        res.status(401);
        throw new Error('cant find user');
    }
    // make sure the logged in user matches the goal's user
    if( goal.user.toString() != req.user._id){
        res.status(401);
        throw new Error('User not authorized to update others goals');
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedGoal);
})




const deleteGoals = asyncHandler(async (req, res)=>{

    const {id} = req.params;
    const goal = await Goal.findById(id);
    if( !goal){
        res.status(400);
        throw new Error('goal not found');
    }
    const user = await User.findById(req.user._id);
    if( !user){
        res.status(401);
        throw new Error('cant find user');
    }

    // make sure the logged in user matches the goal's user
    if( goal.user.toString() != req.user._id){
        res.status(401);
        throw new Error('User not authorized to update others goals');
    }

    await Goal.findByIdAndDelete(id);

    res.status(200).json({msg: ` goal with id= ${id} deleted`});
})


module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}