const { User } = require('../models/index');

class UserRepository {
  async create(data) {
    try {
        console.log("printing data at user-repository:",data);
      return await User.create(data); // Use 'data' instead of 'user'
    } catch (error) {
      console.log("something went wrong on user-repository.js");
      throw error;
    }
  } 

  async destroy(userId) {
    try {
      return await User.destroy({ where: { id: userId } }); // Use the correct field name
    } catch (error) {
      console.log("something went wrong on user-repository.js");
      throw error;
    }
  }


async getById(userId) {
    try{
        const user = await User.findByPK(userId, {attributes: ['id', 'email']});
        return user;
      } catch (error) {
        console.log("something went wrong on user-repository.js");
        throw error;
      }
    }

}

module.exports = UserRepository;


