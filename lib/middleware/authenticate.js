const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
      
    console.log('""COOKIE', process.env.COOKIE_NAME);
    const cookkkkkie = req.cookies[process.env.COOKIE_NAME];
    // console.log('???COOKIE???', cookie);
    const payload = jwt.verify(cookkkkkie, process.env.JWT_SECRET);
    if (!cookkkkkie) throw new Error('You must be signed in to continue');
    req.user = payload;
    console.log(payload);
    next();
  } catch (error) {
    error.status = 401;
    next(error);
  }
};
