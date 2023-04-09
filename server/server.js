const express = require('express');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');


connectDB();

const {errorHandler} = require('./middleware/errorMiddleware')
const goalRoutes = require('./routes/goalRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use(express.urlencoded( {extended: false}))

app.use('/api/goals', goalRoutes);
app.use('/api/users', userRoutes);
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
});
