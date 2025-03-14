const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');  
const { JWT_KEY } = require('../config/serverConfig');
const bcrypt = require('bcrypt'); 

class UserService {
    constructor(userRepository = new UserRepository()) { // Provide a default instance
        this.userRepository = userRepository;
    }

    async create(data) {
        try {
            console.log(`data at the service layer:`, data);
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.error("Something went wrong in user-service.js", error);
            throw error;
        }
    }

    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, { expiresIn: '1h' });
            return result;
        } catch (error) {
            console.error("Something went wrong in token creation", error);  
            throw error;
        }
    }

    verifyToken(token) {
        try {
            const result = jwt.verify(token, JWT_KEY);
            return result;
        } catch (error) {
            console.error("Something went wrong in token verification", error);  
            throw error;
        }
    }

    checkPassword(userInputPassword, encryptedPassword) { 
        try {
            return bcrypt.compareSync(userInputPassword, encryptedPassword);
        } catch (error) {
            console.error("Something went wrong in password verification", error);  
            throw error;
        }
    }

    async signIn(email, plainPassword) {
        try {
            // step-1 -> fetch the user using the email
            const user = await this.userRepository.getByEmail(email);
            // step-2 -> compare the incoming plain password with the encrypted password
            const passwordsMatch = this.checkPassword(plainPassword, user.password);
            if (!passwordsMatch) {
                console.log("Passwords do not match");
                throw new Error("Passwords do not match");
            }
            // step-3 -> if password match then create a token and send it to the user  
            const newJWT = this.createToken({ email: user.email, id: user.id });
            return newJWT; 
        } catch (error) { 
            console.error("Something went wrong in the sign in process", error);
            throw error;
        }  
    }

    async isAuthenticated(token) {
        try {
            const response = this.verifyToken(token);
            console.log(`response at the service layer:`, response);
            if (!response) {
                console.log("Token is not verified");
                throw new Error("Invalid token");
            } else {
                const user = await this.userRepository.getById(response.id);
                console.log(`user at the service layer:`, user);
                if (!user) {
                    console.log("user not found at the service layer");
                    throw new Error("NO user with the corresponding token exists");
                }
                return user.id;
            }
        } catch (error) {
            console.error("Something went wrong in the authentication process", error);
            throw error;
        }
    }
}

module.exports = UserService;