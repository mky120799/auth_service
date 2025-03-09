const UserService = require('../services/user-service');

const userService = new UserService();

const create = async (req, res) => {
  try {
    console.log(`req.body prints at the controller layer ${req.body}`,req.body);
    const user = await userService.create({
      email: req.body.email,
      password: req.body.password
    });
    return res.status(201).json({
      message: "User created successfully",
      data: user,
      success: true
    });
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      data: {},
      success: false,
      err: error
    });
  }
};

module.exports = {
  create
};