DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS picks CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(60) NOT NULL,
  last_name VARCHAR(60) NOT NULL,
  password TEXT NOT NULL,
  email VARCHAR(60) NOT NULL
);

-- points is the points that the chosen team got on the game (2 for sat)
CREATE TABLE picks (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  team_id INTEGER NOT NULL,
  team_name VARCHAR(60) NOT NULL,
  date TIMESTAMP NOT NULL,
  points INTEGER NOT NULL
);


-- INSERT INTO users (name, password, email) VALUES
-- ('Devin Coughlin', '1', 'devin@email.com' );