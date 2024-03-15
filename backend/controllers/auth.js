const helpers = require("../helpers/auth");

const signup = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    await helpers.signup(email, password);
    res.status(200).json({
      message: "User created",
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const token = await helpers.login(email, password);
    res.status(200).json({ message: "Auth successful", token });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  signup,
  login,
};
