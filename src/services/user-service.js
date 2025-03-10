const UserRepository = require('../repository/user-repository');

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
}

module.exports = UserService;