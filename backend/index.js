const express = require('express');
const connectDB = require('./config/config');
require('dotenv').config();
const PORT = process.env.PORT || 8080;
const app = express();

const startConnection = async ()=>{
    try{
        await connectDB(process.env.DB_URI)
        app.listen(PORT, () => {
            console.log(`Server is Runing on http://localhost:${PORT}`)
        })
    }
    catch(err){
        console.log(`Database is showing Error ${err.message}`)
    }
}
startConnection()
