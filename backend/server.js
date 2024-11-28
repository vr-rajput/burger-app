require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db');
const orderRoutes = require('./routes/orderRoutes');
 
app.use(express.json());

app.use( cors());
 

connectDB();

// Routes
app.use('/order', orderRoutes);

app.listen( PORT, () => {
    console.log(`Server run on ${PORT}`);
} );