const pool = require('../utils/pool');
const jwt = require('jsonwebtoken');




module.exports = class Gig {
  gig_id;
  gig_name;
  third_party_link;
  salary_hourly;




  constructor(row) {
    this.gig_id = row.gig_id;
    this.gig_name = row.gig_name;
    this.third_party_link = row.third_party_link;
    this.salary_hourly = row.salary_hourly;
  }

  static async insert({ gig_name, third_party_link, salary_hourly }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
        gigs (gig_name, third_party_link, salary_hourly)
      VALUES
        ($1, $2, $3)
      RETURNING
        *
      `,
      [gig_name, third_party_link, salary_hourly]
    );
    return new Gig(rows[0]);
  }

  static async getAllGigs(){
    const { rows } = await pool.query(
      `
      SELECT
      *
      FROM
      gigs
      `,
    );
    return rows.map((row) => (row));
  }




};


