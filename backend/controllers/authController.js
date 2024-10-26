const authService = require('../services/authService');

exports.register = async (req, res) => {
  try {
    const chairman = await authService.registerChairman(req.body);
    const token = await authService.generateToken(chairman.id);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const chairman = await authService.loginChairman(email, password);
    const token = await authService.generateToken(chairman.id);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ msg: err.message });
  }
};