CREATE DATABASE IF NOT EXISTS goal; #Creates the schema

CREATE TABLE IF NOT EXISTS goal.users(
  username VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  member_since DATE,
  user_type VARCHAR(256),
  PRIMARY KEY (username));
  
CREATE TABLE IF NOT EXISTS goal.user_sessions(
  username VARCHAR(255) NOT NULL,
  token VARCHAR(255) NOT NULL,
  ip_address VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  expires VARCHAR(255) NOT NULL,
  PRIMARY KEY (username, token),
  FOREIGN KEY  (username) REFERENCES users(username));
  
CREATE TABLE IF NOT EXISTS goal.games(
  game_id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  release_year INT NOT NULL,
  publisher VARCHAR(255) NOT NULL,
  PRIMARY KEY (game_id));
  
CREATE TABLE IF NOT EXISTS goal.todo_lists(
  username VARCHAR(255) NOT NULL,
  list_name VARCHAR(255) NOT NULL,
  game_id INT NOT NULL,
  PRIMARY KEY (username, list_name, game_id),
  FOREIGN KEY (username) REFERENCES users(username),
  FOREIGN KEY (game_id) REFERENCES games(game_id));
  
CREATE TABLE IF NOT EXISTS goal.tasks(
  username VARCHAR(255) NOT NULL,
  list_name VARCHAR(255) NOT NULL,
  game_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  is_complete BOOLEAN NOT NULL,
  PRIMARY KEY (username, list_name, game_id, name),
  FOREIGN KEY(username, list_name, game_id) REFERENCES todo_lists(username, list_name, game_id) ON DELETE CASCADE ON UPDATE CASCADE);
  
CREATE TABLE IF NOT EXISTS goal.achievements(
  achievement_number INT AUTO_INCREMENT NOT NULL,
  game_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  score INT NOT NULL,
  is_spoiler BOOLEAN NOT NULL,
  PRIMARY KEY (achievement_number),
  FOREIGN KEY (game_id) REFERENCES games(game_id));

CREATE TABLE IF NOT EXISTS goal.completed_achievements(
  username VARCHAR(255) NOT NULL,
  achievement_number INT NOT NULL,
  PRIMARY KEY (username, achievement_number),
  FOREIGN KEY (username) REFERENCES users(username),
  FOREIGN KEY (achievement_number) REFERENCES achievements(achievement_number) ON DELETE CASCADE);
  
CREATE TABLE IF NOT EXISTS goal.game_reviews(
  username VARCHAR(255) NOT NULL,
  game_id INT NOT NULL,
  timestamp DATE NOT NULL,
  last_edited DATE NOT NULL,
  text VARCHAR(255),
  rating INT NOT NULL,
  PRIMARY KEY (username, game_id),
  FOREIGN KEY (username) REFERENCES users(username),
  FOREIGN KEY (game_id) REFERENCES games(game_id));
  
CREATE TABLE IF NOT EXISTS goal.owned_games(
  username VARCHAR(255) NOT NULL,
  game_id INT NOT NULL,
  status VARCHAR(255) NOT NULL,
  PRIMARY KEY (game_id, username),
  FOREIGN KEY (username) REFERENCES users(username),
  FOREIGN KEY (game_id) REFERENCES games(game_id));
  
CREATE TABLE IF NOT EXISTS goal.developed_games(
  username VARCHAR(255) NOT NULL,
  game_id INT NOT NULL,
  PRIMARY KEY (game_id, username),
  FOREIGN KEY (username) REFERENCES users(username),
  FOREIGN KEY (game_id) REFERENCES games(game_id));
  
CREATE TABLE IF NOT EXISTS goal.game_timeline_entries(
  username VARCHAR(255) NOT NULL,
  game_id INT NOT NULL,
  datetime TIMESTAMP NOT NULL,
  status VARCHAR(255) NOT NULL,
  PRIMARY KEY (username, game_id, datetime),
  FOREIGN KEY (username) REFERENCES users(username),
  FOREIGN KEY (game_id) REFERENCES games(game_id));
  
CREATE TABLE IF NOT EXISTS goal.achievement_timeline_entries(
  username VARCHAR(255) NOT NULL,
  achievement_number INT,
  datetime TIMESTAMP NOT NULL,
  PRIMARY KEY (username, achievement_number, datetime),
  FOREIGN KEY (username) REFERENCES users(username),
  FOREIGN KEY (achievement_number) REFERENCES achievements(achievement_number) ON DELETE CASCADE ON UPDATE CASCADE);
  
CREATE TABLE IF NOT EXISTS goal.custom_game_statuses(
  username VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  colour VARCHAR(255) NOT NULL,
  ordering INT NOT NULL,
  PRIMARY KEY (username, name),
  FOREIGN KEY (username) REFERENCES users(username));
  
CREATE TABLE IF NOT EXISTS goal.custom_game_timeline_entries(
  username VARCHAR(255) NOT NULL,
  game_id INT NOT NULL,
  datetime TIMESTAMP NOT NULL,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (username, datetime, name),
  FOREIGN KEY (username, name) REFERENCES custom_game_statuses(username, name) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (game_id) REFERENCES games(game_id));

CREATE TABLE IF NOT EXISTS goal.custom_status_used(
  username VARCHAR(255) NOT NULL,
  game_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (username, game_id),
  FOREIGN KEY (username, name) REFERENCES custom_game_statuses(username, name) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (username) REFERENCES users(username),
  FOREIGN KEY (game_id) REFERENCES games(game_id) );