import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://goalsetter-04n2.onrender.com/api/goals';
const initialState = {
    goals: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
};


// create a new goal
export const createGoal = createAsyncThunk('goals/create', async(goalData, thunkAPI)=>{
    try{
        // get the token from the user redux store (using thunkAPI)
        const token = thunkAPI.getState().auth.user.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const response = await axios.post(`${API_URL}`, goalData, config);
        return await response.data;

        // return await goalService.createGoal(goalData);
    }catch(error){
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
})


// get user goals
export const getGoals = createAsyncThunk('goals/getAll', async( _, thunkAPI)=>{
        try{
            const token = thunkAPI.getState().auth.user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.get(`${API_URL}`, config);
            return await response.data;
        }catch(error){
            const message =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }   
    }
);

export const updateGoal = createAsyncThunk('goals/update', async({goalId, goalData}, thunkAPI)=>{
    try{
        console.log(goalId, goalData)
        const token = thunkAPI.getState().auth.user.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.put(`${API_URL}/${goalId}`, goalData, config);
        return await response.data;
    }catch(error){

    }
})

export const deleteGoal = createAsyncThunk('goals/delete', async(goalId, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.token;
        const config={
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }

        const response = await axios.delete(`${API_URL}/${goalId}`, config);
        return await response.data;
    }catch(error){
        const message =
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});



export const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder)=>{
        builder
            .addCase(createGoal.pending, (state)=>{
                state.isLoading= true
            })
            .addCase(createGoal.fulfilled, (state, action)=>{
                state.isLoading= false
                state.isSuccess= true
                state.goals.push(action.payload)
            })
            .addCase(createGoal.rejected, (state, action)=>{
                state.isLoading=false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getGoals.pending, (state)=>{
                state.isLoading= true
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = action.payload
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateGoal.pending, (state)=>{
                state.isLoading= true
            })
            .addCase(updateGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = action.payload
            })
            .addCase(updateGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteGoal.pending, (state)=>{
                state.isLoading=true
            })
            .addCase(deleteGoal.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess= true
                state.goals = state.goals.filter((goal)=>(
                    goal._id !== action.payload.id
                ))
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
});

export const {reset} = goalSlice.actions;
export default goalSlice.reducer;