const dotenv = require('dotenv');
const bycrpyt = require('bcrypt');
 
dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    SALT: bycrpyt.genSaltSync(10),
}
