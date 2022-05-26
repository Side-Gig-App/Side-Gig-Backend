 -- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`


DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS favorites CASCADE;
DROP TABLE IF EXISTS goals CASCADE;
DROP TABLE IF EXISTS gigs CASCADE;



-- add table for profiles, favorites, goals, gigs 

CREATE TABLE profiles (
  profiles_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  city TEXT,
  state TEXT,
  marital_status TEXT
);


CREATE TABLE goals (
  goal_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  profiles_id INT NOT NULL REFERENCES profiles(profiles_id),
  goal_amount INT NOT NULL,
  goal_accomplished BOOLEAN NOT NULL
);

CREATE TABLE gigs (
  gig_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  gig_name NOT NULL,
  third_party_link NOT NULL,
  salary_hourly INT NOT NULL
);

CREATE TABLE favorites (
  favorite_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  profiles_id INT NOT NULL REFERENCES profiles(profiles_id),
  is_favorite BOOLEAN NOT NULL,
  gig_id INT NOT NULL REFERENCES gigs(gig_id)
);




