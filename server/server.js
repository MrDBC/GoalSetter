const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv')
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');
const cors = require('cors');

const {errorHandler} = require('./middleware/errorMiddleware')
const goalRoutes = require('./routes/goalRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
const app = express();
app.use(cors({credentials: true}));

connectDB();
app.use(express.json());
app.use(express.urlencoded( {extended: false}))

app.use('/api/goals', goalRoutes);
app.use('/api/users', userRoutes);
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
});
