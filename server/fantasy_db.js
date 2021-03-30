const Pool = require("pg").Pool;
const pool = new Pool({
  user: "my_user",
  host: "localhost",
  database: "fantasy_that",
  password: "root",
  port: 5432,
});

const getUser = (body) => {
  return new Promise(function (resolve, reject) {
    const { email, password } = body;
    pool.query(
      `SELECT id, first_name, last_name, email 
              FROM users
              WHERE email = $1 AND password = $2;
              `,
      [email, password],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results.rows.length === 0) {
          resolve(null);
        } else {
          let userData = results.rows[0];
          let user = {
            id: userData.id,
            firstName: userData.first_name,
            lastName: userData.last_name,
            email: userData.email,
          };
          resolve(user);
        }
      }
    );
  });
};

const createUser = (body) => {
  return new Promise(function (resolve, reject) {
    const { firstName, lastName, email, password } = body;
    pool.query(
      "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [firstName, lastName, email, password],
      (error, results) => {
        if (error) {
          reject(error);
        }
        let userData = results.rows[0];
        let user = {
          id: userData.id,
          firstName: userData.first_name,
          lastName: userData.last_name,
          email: userData.email,
        };
        resolve(user);
      }
    );
  });
};

const createPick = (body) => {
  return new Promise(function (resolve, reject) {
    const { user_id, team_id, team_name, date, points } = body;
    pool.query(
      "INSERT INTO picks (team_id, team_name, points) VALUES ($1, $2, $3, $4) RETURNING *",
      [user_id, team_id, team_name, points],
      (error, results) => {
        if (error) {
          reject(error);
        }
        // let userData = results.rows[0];
        // let user = {
        //   id: userData.id,
        //   firstName: userData.first_name,
        //   lastName: userData.last_name,
        //   email: userData.email,
        console.log("result of post::::::", results);
        // }
        resolve(results);
      }
    );
  });
};

module.exports = {
  getUser,
  createUser,
  createPick,
};
