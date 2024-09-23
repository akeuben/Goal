# The below SELECT queries can be used to access the data from 2 seperate tables when necessary. 
# They can be related with a FOREIGN KEY , but the  does not need to be defined, you just run the risk of not have matching data.
SELECT * FROM goal.users LEFT JOIN goal.player_users ON users.email_id=player_users.email_id;
SELECT * FROM goal.player_users LEFT JOIN goal.users ON player_users.email_id=users.email_id;

SELECT * FROM goal.player_users LEFT JOIN goal.todo_list ON player_users.email_id=todo_list.email_id;
SELECT * FROM goal.todo_list LEFT JOIN goal.player_users ON todo_list.email_id=player_users.email_id;

SELECT * FROM goal.player_users LEFT JOIN goal.game_statuses ON player_users.email_id=game_statuses.email_id;
SELECT * FROM goal.game_statuses LEFT JOIN goal.player_users ON game_statuses.email_id=player_users.email_id;

SELECT * FROM goal.player_users LEFT JOIN goal.custom_game_statuses ON player_users.email_id=custom_game_statuses.email_id;
SELECT * FROM goal.custom_game_statuses LEFT JOIN goal.player_users ON custom_game_statuses.email_id=player_users.email_id;

SELECT * FROM goal.player_users LEFT JOIN goal.game_reviews ON player_users.email_id=game_reviews.email_id;
SELECT * FROM goal.game_reviews LEFT JOIN goal.player_users ON game_reviews.email_id=player_users.email_id;

SELECT * FROM goal.player_users LEFT JOIN goal.timeline_entries ON player_users.email_id=timeline_entries.email_id;
SELECT * FROM goal.timeline_entries LEFT JOIN goal.player_users ON timeline_entries.email_id=player_users.email_id;

SELECT * FROM goal.timeline_entries LEFT JOIN goal.custom_game_statuses ON timeline_entries.custom_status_id=custom_game_statuses.custom_status_id;
SELECT * FROM goal.custom_game_statuses LEFT JOIN goal.timeline_entries ON custom_game_statuses.custom_status_id=timeline_entries.custom_status_id;

SELECT * FROM goal.game_statuses LEFT JOIN goal.custom_game_statuses ON game_statuses.custom_status_id=custom_game_statuses.custom_status_id;
SELECT * FROM goal.custom_game_statuses LEFT JOIN goal.game_statuses ON custom_game_statuses.custom_status_id=game_statuses.custom_status_id;

SELECT * FROM goal.users LEFT JOIN goal.developer_users ON users.email_id=developer_users.email_id;
SELECT * FROM goal.developer_users LEFT JOIN goal.users ON developer_users.email_id=users.email_id;
  
SELECT * FROM goal.user_sessions LEFT JOIN goal.users ON user_sessions.email_id=users.email_id;
SELECT * FROM goal.users LEFT JOIN goal.user_sessions ON users.email_id=user_sessions.email_id;
   
SELECT * FROM goal.developer_users LEFT JOIN goal.developed_games ON developer_users.developed_games_id=developed_games.developed_games_id;
SELECT * FROM goal.developed_games LEFT JOIN goal.developer_users ON developed_games.developed_games_id=developer_users.developed_games_id;
   
SELECT * FROM goal.games LEFT JOIN goal.developers ON games.developers_id=developers.developers_id;
SELECT * FROM goal.games LEFT JOIN goal.achievements ON games.game_id=achievements.game_id;
SELECT * FROM goal.games LEFT JOIN goal.game_reviews ON games.game_id=game_reviews.game_id;
SELECT * FROM goal.games LEFT JOIN goal.timeline_entries ON games.game_id=timeline_entries.game_id;
SELECT * FROM goal.games LEFT JOIN goal.game_statuses ON games.game_id=game_statuses.game_id;
SELECT * FROM goal.games LEFT JOIN goal.todo_list ON games.game_id=todo_list.game_id;

SELECT * FROM goal.achievements LEFT JOIN goal.timeline_entries ON achievements.achievement_number=timeline_entries.achievement_number;
