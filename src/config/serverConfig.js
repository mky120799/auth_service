const dotenv = require('dotenv');
const bycrpyt = require('bcrypt');
 
dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    SALT: bycrpyt.genSaltSync(10),
    JWT_KEY: process.env.JWT_KEY,
    DB_SYNC: process.env.DB_SYNC
    

}
