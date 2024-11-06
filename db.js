const mongoose = require('mongoose');

require('dotenv').config();
// const mongoURL=process.env.DB_URL;
const mongoURL=process.env.DB_URL_ONLINE;


mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})


const db= mongoose.connection;


db.on('connected',()=>{
    console.log('Connected to Mongo db Server');
});
db.on('disconnected',()=>{
    console.log('Mongo db Server Disconnected.');
});
db.on('error',()=>{
    console.log('Mongo db Server error.');
});

//export db connection

module.exports=db;