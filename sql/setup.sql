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
  gig_name TEXT NOT NULL UNIQUE,
  third_party_link TEXT NOT NULL UNIQUE,
  salary_hourly DECIMAL NOT NULL
);

CREATE TABLE favorites (
  profiles_id BIGINT REFERENCES profiles(profiles_id),
  is_favorite BOOLEAN DEFAULT FALSE NOT NULL,
  gig_id BIGINT REFERENCES gigs(gig_id)
);

INSERT INTO gigs(
  gig_name,
  third_party_link,
  salary_hourly 
)

VALUES
('uber', 'uber.com', '0'),
('lyft', 'lyft.com', '0'),
('doordash', 'doordash.com', '0'),
('lawn', 'lawn-maintenance.com', '0'),
('grubhub', 'grubhub.com', '0'),
('nanny', 'nanny.com', '0'),
('tutor', 'tutor.com', '0')

-- INSERT INTO favorites(
--   profiles_id,
--   is_favorite,
--   gig_id
-- )

-- VALUES
-- ('1', 'true', '3'),
-- ('2', 'true', '7')



