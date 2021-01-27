const Pool = require("pg").Pool;
const pool = new Pool({
  user: "my_user",
  host: "localhost",
  database: "fantasy_that",
  password: "root",
  port: 5432,
});

const getUsers = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
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
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
        };
        resolve(user);
      }
    );
  });
};

// const deleteUser = () => {
//   return new Promise(function(resolve, reject) {
//     const id = parseInt(request.params.id)
//     pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
//       if (error) {
//         reject(error)
//       }
//       resolve(`User deleted with ID: ${id}`)
//     })
//   })
// }

const sayHello = function () {
  console.log("hello");
};

module.exports = {
  getUsers,
  createUser,
  sayHello,
  // deleteMerchant,
};
