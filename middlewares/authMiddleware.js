const jwt = require("jsonwebtoken");
const { RequestError } = require("../helpers");
const User = require("../models/users");

const authMiddleware = async function (req, res, next) {
  try {

    const header = req.headers.authorization;
    if (!header) throw RequestError(401, "Pls provide a token");

    const [tokenType, token] = req.headers.authorization.split(" ");
  
    if (tokenType !== "Bearer")
      throw RequestError(401, "Token type have to be a 'Bearer'");
    if (!token) throw RequestError(401, "Pls provide a token");

    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!tokenDecoded) throw RequestError(401, "Pls provide a token  token dododod");

    const user = await User.findById(tokenDecoded.userId, [
      "-password",
      "-createdAt",
      "-updatedAt",
    ]).populate("contactUser", { name: true, phone: true })
      .populate("noteUser", { title: true, content: true })
 
    if (token !== user.token) throw RequestError(401, "Pls provide a token");

    req.user = user;
    next();
  }
  catch (error) {
    res.status(500).json({error})
  }
};

module.exports = authMiddleware;
