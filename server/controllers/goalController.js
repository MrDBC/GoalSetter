const asyncHandler= require('express-async-handler')
const Goal = require('../models/goalModel')

const getGoals = asyncHandler( async (req, res)=>{
    const goals = await Goal.find();
    res.status(200).json(goals);
})

const setGoals = asyncHandler(async (req, res)=>{
    if( !req.body.text){
        res.status(400);
        throw new Error( 'plz add a text field');
    }

    const goal = await Goal.create({
        text: req.body.text,
    })
    console.log(goal.text)
    res.status(200).json(goal);
})

const updateGoals = asyncHandler(async(req, res)=>{
    const goal = await Goal.findById(req.params.id);

    if( !goal){
        res.status(400);
        throw new Error('goal not found');
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

    await Goal.findByIdAndDelete(id);

    res.status(200).json({msg: ` goal with id= ${id} deleted`});
})


module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}