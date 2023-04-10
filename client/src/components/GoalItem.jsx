import { useState } from "react";
import { useDispatch } from "react-redux";
import {getGoals, deleteGoal, updateGoal } from "../features/goals/goalSlice";

function GoalItem({ goal }) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(goal.text);

  
  const handleDelete = () => {
    dispatch(deleteGoal(goal._id)).then(() => {
      dispatch(getGoals());
    });
  };

  const handleUpdate = () => {
    dispatch(updateGoal({goalId: goal._id, goalData: {text}} )).then(()=>{
        dispatch(getGoals());
    })
    setEditing(false);
    // console.log(text)
  };

  return (
    <div className="goalitem">
        <div className="time">
            <div >Created : {new Date(goal.createdAt).toLocaleString("en-US")}</div>
            <div >Last Updated : {new Date(goal.updatedAt).toLocaleString("en-US")}</div>
        </div>
      
      
      {!editing ? (
        <div className="goaledit">
            <h2>{goal.text}</h2>
            <button className="edit btn-reverse " onClick={() => setEditing(true)}>
                Edit
            </button>
        </div>
      ) : (
        <div className="editsave">
            <textarea className="edittext" value={text} 
                onChange={(e) => setText(e.target.value)}
                cols="30" rows="10"></textarea>
            <button className="save btn" onClick={handleUpdate}>
                Save
            </button>
        </div>
      )}
      <button className="close" onClick={handleDelete}>
        <h1 style={{color:"gray", borderRadius: "5px"}}>X</h1>
      </button>
    </div>
  );
}

export default GoalItem;