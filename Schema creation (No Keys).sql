#Run this file once in MySQL to setup the database

CREATE DATABASE IF NOT EXISTS goal; #Creates the schema

CREATE TABLE IF NOT EXISTS goal.users(
email_id VARCHAR(255) NOT NULL UNIQUE,
  username VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL);

CREATE TABLE IF NOT EXISTS goal.player_users(
email_id VARCHAR(255) NOT NULL UNIQUE,
  member_since DATE NOT NULL);
  
CREATE TABLE IF NOT EXISTS goal.developer_users(
email_id VARCHAR(255) NOT NULL UNIQUE,
  developed_games_id INT NOT NULL UNIQUE);
  
  #Insert the developed_games_id which is unique to every developer with the game_id of the game they developed. If a developer developed more than 1 game, Insert the developed_games_id and the next game on the list and so on.
CREATE TABLE IF NOT EXISTS goal.developed_games(
developed_games_id INT NOT NULL UNIQUE,
  game_id INT NOT NULL);
  
CREATE TABLE IF NOT EXISTS goal.user_sessions(
token VARCHAR(255) NOT NULL UNIQUE,
  ip_address VARCHAR(255) NOT NULL,
  expires VARCHAR(255) NOT NULL,
  email_id VARCHAR(255) NOT NULL UNIQUE);
  
CREATE TABLE IF NOT EXISTS goal.games(
game_id INT NOT NULL AUTO_INCREMENT UNIQUE,
  name VARCHAR(255) NOT NULL,
  release_year YEAR NOT NULL,
  developers_id INT NOT NULL,
  publisher VARCHAR(255) NOT NULL,
  game_description VARCHAR(255));
  
CREATE TABLE IF NOT EXISTS goal.developers(
developers_id INT NOT NULL,
  email_id VARCHAR(255) NOT NULL);
  
CREATE TABLE IF NOT EXISTS goal.achievements(
achievement_number INT NOT NULL AUTO_INCREMENT UNIQUE,
  name VARCHAR(255) NOT NULL,
  score INT,
  spoiler BOOLEAN NOT NULL,
  achievement_description VARCHAR(255),
  game_id INT NOT NULL);
  
CREATE TABLE IF NOT EXISTS goal.game_reviews(
email_id VARCHAR(255) NOT NULL,
  timestamp DATE NOT NULL,
  last_edited DATE NOT NULL,
  isPositive BOOLEAN NOT NULL,
  game_id INT NOT NULL,
  text VARCHAR(255));
  
CREATE TABLE IF NOT EXISTS goal.todo_list(
email_id VARCHAR(255) NOT NULL ,
  name VARCHAR(255) NOT NULL,
  task_id INT NOT NULL UNIQUE,
  game_id INT NOT NULL);
  
CREATE TABLE IF NOT EXISTS goal.tasks(
task_id INT NOT NULL UNIQUE,
  isComplete BOOLEAN NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255));
  
CREATE TABLE IF NOT EXISTS goal.game_statuses(
email_id VARCHAR(255) NOT NULL,
  status VARCHAR(255) NOT NULL,
  custom_status_id INT UNIQUE,
  game_id INT NOT NULL);
  
CREATE TABLE IF NOT EXISTS goal.custom_game_statuses(
custom_status_id INT NOT NULL AUTO_INCREMENT UNIQUE,
  email_id VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  colour VARCHAR(255) NOT NULL,
  ordering INT NOT NULL);
  
CREATE TABLE IF NOT EXISTS goal.timeline_entries(
email_id VARCHAR(255) NOT NULL ,
  date DATE NOT NULL,
  status VARCHAR(255) NOT NULL,
  achievement_number INT,
  game_id INT,
  custom_status_id INT);
    
  
  
  
  
  
  