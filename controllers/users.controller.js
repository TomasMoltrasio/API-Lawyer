const usersController = {};

const User = require("../models/User.js");

usersController.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    const matchPassword = await user.matchPassword(password);
    if (matchPassword) {
      return res.json({
        _id: user._id,
        username: user.username,
        token: user.generateToken(user._id),
      });
    }
  }
  res.status(401).json({
    message: "Invalid username or password",
  });
};

usersController.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

usersController.createUser = async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

usersController.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

usersController.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

usersController.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "Cannot find user",
      });
    }
    res.json({
      message: "User deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = usersController;
