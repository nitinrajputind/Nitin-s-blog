const mongoose = require('mongoose');


const startConnection=(URI)=>{

    mongoose.connect(URI)
    .then((res)=>{
        console.log(`Server is Connected to ${res.connection.host}`);
    })
    .catch((err)=>{
        console.log(`Error connecting to ${err.message}`);
    });

}

module.exports = startConnection;