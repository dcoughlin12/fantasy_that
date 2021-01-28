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
    console.log("body in post", body);
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
          console.log("results from back", results);
          let userData = results.rows[0];
          let user = {
            id: userData.id,
            firstName: userData.first_name,
            lastName: userData.last_name,
            email: userData.email,
          };
          console.log("user SENT :::", user);
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
        console.log("USER DATA AFTER POST", userData);
        let user = {
          id: userData.id,
          firstName: userData.first_name,
          lastName: userData.last_name,
          email: userData.email,
        };
        console.log("USER SENT BACK", user);
        resolve(user);
      }
    );
  });
};

module.exports = {
  getUser,
  createUser,
};
