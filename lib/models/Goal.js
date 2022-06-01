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

  static async insertGoal({ goal_id, profiles_id, goal_amount, goal_accomplished }){
    const { rows } = await pool.query(
      `
          INSERT INTO
          goals (goal_id, profiles_id, goal_amount, goal_accomplished)
          VALUES
          ($1, $2, $3, $4)
          RETURNING 
          *
          `,
      [goal_id, profiles_id, goal_amount, goal_accomplished]
    );
    return new Goal(rows[0]);
  }

  static async updateGoal({ goal_id, profiles_id, goal_amount, goal_accomplished }) {
    const { rows } = await pool.query(
      `
          UPDATE
          goals
          SET
          goal_accomplished=$1
          WHERE
          profiles_id=$2 AND goal_id=$3
          `,
      [goal_accomplished, profiles_id, goal_id, goal_amount]
    );
    return new Goal(rows[0]);
  }

};
