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
       console.log("printing userId at user-repository",userId);
        const user = await User.findByPk(userId, {attributes: ['id', 'email']});
        console.log("printing user at user-repository",user);
        return user;
      } catch (error) {
        console.log("something went wrongg on user-repository.js");
        throw error;
      }
    }
  
   async getByEmail(userEmail) {
    try {
      console.log("printing userEmail at user-repository:",userEmail
      );
      const user = await User.findOne({ where: { email:userEmail } });
      console.log("printing user at user-repository:",user);
      return user;
    } catch (error) {
      console.log("something went wrong on user-repository.js");
      throw error;
    }

  }

}



module.exports = UserRepository;


