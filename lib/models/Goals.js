const pool = require('../utils/pool');

module.exports = class Goal{
  goal_id;
  profiles_id;
  goal_amount;
  goal_accomplished;

  constructor(row){
    this.goal_id = row.goal_id;
    this.profiles_id = row.profiles_id;
    this.goal_amount = row.goal_amount;
    this.goal_accomplished = row.goal_accomplished;
  }

  static async insertGoal(profiles_id, goal_amount, goal_accomplished){
    // console.log(profiles_id, goal_amount, goal_accomplished, 'goals MODEWAL -------->');
    const { rows } = await pool.query(
      `
          INSERT INTO
          goals (profiles_id, goal_amount, goal_accomplished)
          VALUES
          ($1, $2, $3)
          RETURNING
          *
          `,
      [profiles_id, goal_amount, goal_accomplished]
    );
    return new Goal(rows[0]);
  }

  static async updateGoal(goal_id, profiles_id, goal_accomplished) {
    const { rows } = await pool.query(
      `
          UPDATE
          goals
          SET
          goal_accomplished=$1
          WHERE
          profiles_id=$2 AND goal_id=$3
          RETURNING
          *
          `,
      [goal_accomplished, profiles_id, goal_id]
    );
    return new Goal(rows[0]);
  }

  static async getAllGoals(profiles_id){
    const { rows } = await pool.query(
      `
          SELECT
          * 
          FROM
          profiles
          LEFT JOIN goals
          ON profiles.profiles_id = goals.profiles_id
          WHERE
          profiles.profiles_id=$1
          ORDER BY
          (goal_id) ASC
          `,
      [profiles_id]
    );
    return rows.map((row) => new Goal(row));
  }

};
