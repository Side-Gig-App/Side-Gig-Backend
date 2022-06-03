const pool = require('../utils/pool');

module.exports = class Favorite {
  profiles_id;
  is_favorite;
  gig_id;

  constructor(row) {
    this.profiles_id = row.profiles_id;
    this.is_favorite = row.is_favorite;
    this.gig_id = row.gig_id;
  }

  static async change(is_favorite, email, gig_id) {
    console.log(is_favorite, email, gig_id, 'favorite email gigg 19-----');
    const profileId = Number(email);
    const gigId = Number(gig_id);
    const { rows } = await pool.query(
      `
          UPDATE
            favorites
          SET
            is_favorite=$1
          WHERE
            profiles_id=$2 AND gig_id=$3
            `,
      [is_favorite, profileId, gigId]
    );
    console.log(rows, 'rowws-------');
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
        gigs.gig_name, gigs.salary_hourly, gigs.third_party_link, gigs.gig_id
        FROM
        profiles
        LEFT JOIN favorites
        ON profiles.profiles_id = favorites.profiles_id
        LEFT JOIN 
        gigs
        ON
        favorites.gig_id = gigs.gig_id
        WHERE
        profiles.profiles_id=$1 AND favorites.is_favorite=true
        `,
      [profiles_id]
    );
    console.log('i pity thefool', rows);
    return rows;
  }

  static async insert(is_favorite, email, gig_id){
    const { rows } = await pool.query(
      `
      INSERT INTO
      favorites(is_favorite, profiles_id, gig_id)
      VALUES
      ($1, $2, $3)
      RETURNING
      *
      `,
      [is_favorite, email, gig_id]
    );
    return new Favorite(rows[0]);
  }

  static async delete(gig_id){
    const { rows } = await pool.query(
      `
      DELET FROM
      favorites
      WHERE
      gig_id=$1
      RETURNING
      *
      `,
      [gig_id]
    );
    return new Favorite(rows[0]);
  }
};
