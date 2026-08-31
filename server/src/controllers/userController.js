const userService = require('../services/userService');

const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }
  const result = userService.registerUser({ name, email, password });

  if (result.error) {
    return res.status(409).json({ message: result.error });
  }

  res.status(201).json(result);
};

const getUserProfile = (req, res) => {
  const user = userService.getUserProfile(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
};


const updateUserProfile = (req, res) => {
  const { name, email } = req.body;

  // Validate required fields
  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  const result = userService.updateUserProfile(req.params.id, { name, email });

  // User not found
  if (!result) {
    return res.status(404).json({ message: "User not found" });
  }

  // Email conflict with another user
  if (result.error) {
    return res.status(409).json({ message: result.error });
  }

  res.status(200).json(result);
};

module.exports = { registerUser, getUserProfile, updateUserProfile };
