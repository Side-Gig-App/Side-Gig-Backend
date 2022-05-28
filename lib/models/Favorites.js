
const pool = require('../utils/pool');




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

  static async change(is_favorite, profiles_id) {
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

};


