
const pool = require('../utils/pool');
const User = require('./Profile');




module.exports = class Favorite {
  favorite_id;
  profiles_id;
  is_favorite;
  gig_id;



  constructor(row) {
    this.favorite_id = row.favorite_id;
    this.profiles_id = row.profiles_id;
    this.is_favorite = row.is_favorite;
    this.gig_id = row.gig_id;
  }

  static async change(is_favorite, email) {
    const specificUser = await User.findByEmail(email);
    const { profiles_id } = specificUser;
    const { rows } = await pool.query(
      `
          UPDATE
            favorites
          SET
            is_favorite=$1
          WHERE
            profiles_id=$2
            RETURNING
            *
          `,
      [is_favorite, profiles_id]
    );
    return new Favorite(rows[0]);
  }

  static async fetchFavorites(is_favorite) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM 
      favorites
      WHERE 
      is_favorite = $1
      RETURNING 
        *
      `,
      [is_favorite]
    );
    return rows.map((row) => new Favorite(row));
  }

};


