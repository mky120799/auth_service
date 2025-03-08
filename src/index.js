const express  = require('express');
const {PORT} = require('./config/serverConfig');
const app = express();

const prepareAndStartServer = async () => {
    app.listen(3001, ()=>{console.log(`server started at ${3001}`)})
}


prepareAndStartServer();