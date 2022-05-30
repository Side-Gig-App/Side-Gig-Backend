
const pool = require('../utils/pool');
const Gig = require('./Comparison');
const User = require('./Profile');




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

    const specificUser = await User.findByEmail(email);
    console.log(specificUser, 'specific user------');
    const id = specificUser.profiles_id;
    console.log(id, 'profiles id------');
    // const { rows } = await pool.query(
    //   `
    //       UPDATE
    //         favorites
    //       SET
    //         is_favorite=$1
    //         FROM
    //         profiles
    //       WHERE
    //         profiles_id=$2
    //         RETURNING
    //         *
    //       `,
    //   [is_favorite, id]
    // );
    // const { rows } = await pool.query(`with t as (
    //   select profiles.profiles_id as profiles_id, f(gigs, gigs) as is_favorite($1)
    //   from favorites as profiles
    //   join gigs as gigs on gigs.gigs_id = profiles.profiles_id
    // )
    // update favorites
    // set is_favorite = is_favorite
    // from t
    // where id = $2
    // )
    // `, [is_favorite, id]
    // );
    const { rows } = await pool.query(
      `
          UPDATE
            favorites
          
          SET
            is_favorite=$1
            FROM
            profiles, gigs
          WHERE
            profiles.profiles_id=$2 
            AND
            gigs.gig_id = $3
            RETURNING
            *
          `,
      [is_favorite, id, gig_id]
    );
    console.log(rows, 'rows-------');
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


