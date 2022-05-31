const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
      
    const cookkkkkie = req.cookies[process.env.COOKIE_NAME];
    console.log('???COOKIE???', cookkkkkie);
    const payload = jwt.verify(cookkkkkie, process.env.JWT_SECRET);
    if (!cookkkkkie) throw new Error('You must be signed in to continue');
    req.user = payload;
    next();
  } catch (error) {
    error.status = 401;
    next(error);
  }
};
