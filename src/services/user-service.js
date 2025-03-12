const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');  
const { JWT_KEY } = require('../config/serverConfig'); 
class UserService {
    constructor(userRepository = new UserRepository()) { // Provide a default instance
        this.userRepository = userRepository;
    }

    async create(data) {
        try {
            console.log(`data at the service layer:`, data);
            const user = await this.userRepository.create(data);
            // console.log(user);
            return user;
        } catch (error) {
            console.error("Something went wrong in user-service.js", error);
            throw error;
        }
    }
    createToken(user) {
        try{
            const result = jwt.sign(user, JWT_KEY, {expiresIn: '1h'});
            return result;
        }catch(error){
            console.error("Something went wrong in token creation", error);  
            throw error;
        }
    } 
    verifyToken(token){
        try{
            const result = jwt.verify(token, JWT_KEY);
            return result;
        }catch(error){
            console.error("Something went wrong in token verification", error);  
            throw error;
        }
    } 
    checkPassword(userInputPassword, encryptedPassword){ 
         try{
            return bcrypt.compareSync(userInputPassword, encryptedPassword);

         }catch(error){
            console.error("Something went wrong in password verification", error);  
            throw error;
        }
    }
}
module.exports = UserService;