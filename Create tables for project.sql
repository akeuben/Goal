CREATE DATABASE IF NOT EXISTS goal; #Creates the schema

CREATE TABLE IF NOT EXISTS goal.users(
email_id VARCHAR(255) NOT NULL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  token VARCHAR(255) NOT NULL UNIQUE);

CREATE TABLE IF NOT EXISTS goal.player_users(
email_id VARCHAR(255) NOT NULL PRIMARY KEY,
  member_since DATE NOT NULL);
  
CREATE TABLE IF NOT EXISTS goal.developer_users(
email_id VARCHAR(255) NOT NULL PRIMARY KEY,
  developed_games_id INT NOT NULL UNIQUE);
  
  #Insert the developed_games_id which is unique to every developer with the game_id of the game they developed. If a developer developed more than 1 game, Insert the developed_games_id and the next game on the list and so on.
CREATE TABLE IF NOT EXISTS goal.developed_games(
developed_games_id INT NOT NULL KEY,
  game_id INT NOT NULL);
  
CREATE TABLE IF NOT EXISTS goal.user_sessions(
token VARCHAR(255) NOT NULL PRIMARY KEY,
  ip_address VARCHAR(255) NOT NULL,
  expires VARCHAR(255) NOT NULL,
  email_id VARCHAR(255) NOT NULL);
  
CREATE TABLE IF NOT EXISTS goal.games(
game_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  release_year YEAR NOT NULL,
  developers_id INT NOT NULL,
  publisher VARCHAR(255) NOT NULL,
  game_description VARCHAR(255));
  
CREATE TABLE IF NOT EXISTS goal.developers(
developers_id INT NOT NULL KEY,
  email_id VARCHAR(255) NOT NULL);
  
CREATE TABLE IF NOT EXISTS goal.achievements(
achievement_number INT NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  score INT,
  spoiler BOOLEAN NOT NULL,
  achievement_description VARCHAR(255),
  game_id INT NOT NULL);
  
CREATE TABLE IF NOT EXISTS goal.game_reviews(
email_id VARCHAR(255) NOT NULL PRIMARY KEY,
  timestamp DATE NOT NULL,
  last_edited DATE NOT NULL,
  isPositive BOOLEAN NOT NULL,
  game_id INT NOT NULL,
  text VARCHAR(255));
  
CREATE TABLE IF NOT EXISTS goal.todo_list(
email_id VARCHAR(255) NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  task_id INT NOT NULL UNIQUE,
  game_id INT NOT NULL);
  
CREATE TABLE IF NOT EXISTS goal.tasks(
task_id INT NOT NULL KEY,
  isComplete BOOLEAN NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255));
  
CREATE TABLE IF NOT EXISTS goal.game_statuses(
email_id VARCHAR(255) NOT NULL KEY,
  status VARCHAR(255) NOT NULL,
  custom_status_id INT UNIQUE,
  game_id INT NOT NULL);
  
CREATE TABLE IF NOT EXISTS goal.custom_game_statuses(
email_id VARCHAR(255) NOT NULL KEY,
  custom_status_id INT NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  colour VARCHAR(255) NOT NULL,
  ordering INT NOT NULL);
  
CREATE TABLE IF NOT EXISTS goal.timeline_entries(
email_id VARCHAR(255) NOT NULL KEY,
  date DATE NOT NULL,
  status VARCHAR(255) NOT NULL,
  achievement_number INT,
  game_id INT,
  custom_status_id INT);
  
  
# The below ALTER TABLE is used to add a foreign key to the tables
# It is here because foreign keys cannot be created if the table it is referencing does not exist, 
# so I decided to add foreign keys after all tables have been created.
ALTER TABLE goal.users ADD FOREIGN KEY (token) REFERENCES user_sessions(token);
ALTER TABLE goal.user_sessions ADD FOREIGN KEY (email_id) REFERENCES users(email_id);

ALTER TABLE goal.player_users ADD FOREIGN KEY (email_id) REFERENCES users(email_id);
ALTER TABLE goal.player_users ADD FOREIGN KEY (email_id) REFERENCES game_reviews(email_id);
ALTER TABLE goal.player_users ADD FOREIGN KEY (email_id) REFERENCES custom_game_statuses(email_id);
ALTER TABLE goal.player_users ADD FOREIGN KEY (email_id) REFERENCES game_statuses(email_id);

ALTER TABLE goal.developer_users ADD FOREIGN KEY (email_id) REFERENCES users(email_id);
ALTER TABLE goal.developer_users ADD FOREIGN KEY (developed_games_id) REFERENCES developed_games(developed_games_id);

ALTER TABLE goal.developed_games ADD FOREIGN KEY (developed_games_id) REFERENCES developer_users(developed_games_id);
ALTER TABLE goal.developed_games ADD FOREIGN KEY (game_id) REFERENCES games(game_id);

ALTER TABLE goal.games ADD FOREIGN KEY (developers_id) REFERENCES developers(developers_id);

ALTER TABLE goal.developers ADD FOREIGN KEY (developers_id) REFERENCES games(developers_id);
ALTER TABLE goal.developers ADD FOREIGN KEY (email_id) REFERENCES developer_users(email_id);

ALTER TABLE goal.achievements ADD FOREIGN KEY (game_id) REFERENCES games(game_id);

ALTER TABLE goal.tasks ADD FOREIGN KEY (task_id) REFERENCES todo_list(task_id);


# The below SELECT queries can be used to access the data from 2 seperate tables when necessary. 
# They can be related with a foreign key, but the key does not need to be defined, you just run the risk of not have matching data.
SELECT * FROM goal.users INNER JOIN goal.player_users ON users.email_id=player_users.email_id;
SELECT * FROM goal.player_users INNER JOIN goal.users ON player_users.email_id=users.email_id;

SELECT * FROM goal.player_users INNER JOIN goal.todo_list ON player_users.email_id=todo_list.email_id;
SELECT * FROM goal.todo_list INNER JOIN goal.player_users ON todo_list.email_id=player_users.email_id;

SELECT * FROM goal.player_users INNER JOIN goal.game_statuses ON player_users.email_id=game_statuses.email_id;
SELECT * FROM goal.game_statuses INNER JOIN goal.player_users ON game_statuses.email_id=player_users.email_id;

SELECT * FROM goal.player_users INNER JOIN goal.custom_game_statuses ON player_users.email_id=custom_game_statuses.email_id;
SELECT * FROM goal.custom_game_statuses INNER JOIN goal.player_users ON custom_game_statuses.email_id=player_users.email_id;

SELECT * FROM goal.player_users INNER JOIN goal.game_reviews ON player_users.email_id=game_reviews.email_id;
SELECT * FROM goal.game_reviews INNER JOIN goal.player_users ON game_reviews.email_id=player_users.email_id;

SELECT * FROM goal.player_users INNER JOIN goal.timeline_entries ON player_users.email_id=timeline_entries.email_id;
SELECT * FROM goal.timeline_entries INNER JOIN goal.player_users ON timeline_entries.email_id=player_users.email_id;

SELECT * FROM goal.timeline_entries INNER JOIN goal.custom_game_statuses ON timeline_entries.custom_status_id=custom_game_statuses.custom_status_id;
SELECT * FROM goal.custom_game_statuses INNER JOIN goal.timeline_entries ON custom_game_statuses.custom_status_id=timeline_entries.custom_status_id;

SELECT * FROM goal.game_statuses INNER JOIN goal.custom_game_statuses ON game_statuses.custom_status_id=custom_game_statuses.custom_status_id;
SELECT * FROM goal.custom_game_statuses INNER JOIN goal.game_statuses ON custom_game_statuses.custom_status_id=game_statuses.custom_status_id;

SELECT * FROM goal.users INNER JOIN goal.developer_users ON users.email_id=developer_users.email_id;
SELECT * FROM goal.developer_users INNER JOIN goal.users ON developer_users.email_id=users.email_id;
  
SELECT * FROM goal.user_sessions INNER JOIN goal.users ON user_sessions.token=users.token;
SELECT * FROM goal.users INNER JOIN goal.user_sessions ON users.token=user_sessions.token;
   
SELECT * FROM goal.developer_users INNER JOIN goal.developed_games ON developer_users.developed_games_id=developed_games.developed_games_id;
SELECT * FROM goal.developed_games INNER JOIN goal.developer_users ON developed_games.developed_games_id=developer_users.developed_games_id;
   
SELECT * FROM goal.games INNER JOIN goal.developers ON games.developers_id=developers.developers_id;
SELECT * FROM goal.games INNER JOIN goal.achievements ON games.game_id=achievements.game_id;
SELECT * FROM goal.games INNER JOIN goal.game_reviews ON games.game_id=game_reviews.game_id;
SELECT * FROM goal.games INNER JOIN goal.timeline_entries ON games.game_id=timeline_entries.game_id;
SELECT * FROM goal.games INNER JOIN goal.game_statuses ON games.game_id=game_statuses.game_id;
SELECT * FROM goal.games INNER JOIN goal.todo_list ON games.game_id=todo_list.game_id;

SELECT * FROM goal.achievements INNER JOIN goal.timeline_entries ON achievements.achievement_number=timeline_entries.achievement_number;
    
    
  
  
  
  
  
  