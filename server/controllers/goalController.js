const asyncHandler= require('express-async-handler')


const getGoals = asyncHandler( async (req, res)=>{
    res.status(200).json({msg: 'get goals'});
})

const setGoals = asyncHandler(async (req, res)=>{
    if( !req.body.text){
        res.status(400);
        throw new Error( 'plz add a text field');
    }
    res.status(200).json({msg: 'set goals'});
})

const updateGoals = asyncHandler(async(req, res)=>{
    res.status(200).json({msg: `update goals ${req.params.id}`});
})

const deleteGoals = asyncHandler(async (req, res)=>{
    res.status(200).json({msg: `delete goals ${req.params.id}`});
})


module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}