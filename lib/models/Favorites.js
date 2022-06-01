const pool = require('../utils/pool');
// const Gig = require('./Comparison');
// const User = require('./Profile');

module.exports = class Favorite {
  // favorite_id;
  profiles_id;
  is_favorite;
  gig_id;

  constructor(row) {
    // this.favorite_id = row.favorite_id;
    this.profiles_id = row.profiles_id;
    this.is_favorite = row.is_favorite;
    this.gig_id = row.gig_id;
  }

  static async change(is_favorite, email, gig_id) {
    // const specificGig = await Gig.fetchGigId(gig_id);
    // const specificUser = await User.findByEmail(email);
    // console.log(specificUser, 'specific user------');
    // console.log(specificGig, 'specific gig------');
    // const id = specificUser.profiles_id;
    // const gigId = specificGig.gig_id;
    // console.log(id, 'profiles id------');
    // console.log(gigId, 'gig id------');

    const { rows } = await pool.query(
      `
          UPDATE
            favorites
          SET
            is_favorite=$1
          WHERE
            profiles_id=$2 AND gig_id=$3
            RETURNING *
            `,
      [is_favorite, email, gig_id]
    );
   
    return new Favorite(rows[0]);
  }

  static async fetchFavorites() {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
      favorites
      WHERE
      is_favorite=true
      RETURNING
        *
      `,
      []
    );
    return rows.map((row) => new Favorite(row));
  }

  static async fetchFavByProfileID(profiles_id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
        FROM
        profiles
        LEFT JOIN favorites
        ON profiles.profiles_id = favorites.profiles_id
        WHERE
        profiles.profiles_id=$1
        `,
      [profiles_id]
    );
    return rows.map((row) => new Favorite(row));
  }
};
