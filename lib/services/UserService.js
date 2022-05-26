const bcrypt = require('bcryptjs');
const User = require('../models/Profile');

module.exports = class UserService {
  static async create({ email, password }) {
    const passwordHash = await bcrypt.hashSync(password, Number(process.env.SALT_ROUNDS));
    const user = await User.insert({ email, passwordHash });

    return user;
  }

  static async signIn({ email, password }) {
    const user = await User.findByEmail(email);
    if (!user) throw new Error('Invalid email or password');
    const passwordsMatch = bcrypt.compareSync(password, user.passwordHash);
    if (!passwordsMatch) throw new Error('Invalid email or password');

    return user;
  }
};
