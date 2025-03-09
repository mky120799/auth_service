const express  = require('express');
const bodyParser = require('body-parser');
const {PORT} = require('./config/serverConfig');
const app = express();


const apiRoutes = require('./routes/index');

const prepareAndStartServer = async () => {
    app.use(bodyParser.urlencoded({extended:true})); 
    app.use('/api', apiRoutes)
   
    app.listen(3001, ()=>{console.log(`server started at ${3001}`)})
}


prepareAndStartServer();