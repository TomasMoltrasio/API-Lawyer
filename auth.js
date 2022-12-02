const { expressjwt: jwt } = require("express-jwt");
const dotenv = require("dotenv");
dotenv.config();
const secret = process.env.SECRET;

const auth = jwt({
  secret,
  algorithms: ["HS256"],
  getToken: function fromHeaderOrQuerystring(req) {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      return req.headers.authorization.split(" ")[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  },
});

const handleError = (err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: "invalid token..." });
  }
};

module.exports = { auth, handleError };
