const User = require("../../models/users");

const current = async (req, res) => {
  // const { userId } = req.user;

  // const user = await User.findOne({ _id: userId });
  res
    .status(401)
    .json(req.user);
};

module.exports = current;
