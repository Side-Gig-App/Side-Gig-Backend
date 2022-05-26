const pool = require('../utils/pool');
const jwt = require('jsonwebtoken');

module.exports = class User {
  profiles_id;
  email;
  #passwordHash;
  first_name;
  last_name;
  city;
  state;
  marital_status;

  constructor(row) {
    this.profiles_id = row.profiles_id;
    this.email = row.email;
    this.#passwordHash = row.password;
    this.first_name = row.first_name;
    this.last_name = row.last_name;
    this.city = row.city;
    this.state = row.state;
    this. marital_status = row.marital_status;
  }

  static async insert({ email, password, first_name, last_name, city, state, marital_status }) {
    const { rows } = await pool.query(
      `
          INSERT INTO
            profiles(email, password, first_name, last_name, city, state, marital_status)
          VALUES
            ($1, $2, $3, $4, $5, $6, $7)
          RETURNING 
            *
          `, 
      [email, password, first_name, last_name, city, state, marital_status]
    );
    return new User(rows[0]);
  }

  static async findByEmail(email) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        profiles
      WHERE
        email=$1
      `,
      [email]
    );
    if (!rows[0]) return null;
    return new User(rows[0]);
  }

  get passwordHash() {
    return this.#passwordHash;
  }

  authToken() {
    return jwt.sign({ ...this }, process.env.JWT_SECRET, { expiresIn: '1day' });
  }
};
