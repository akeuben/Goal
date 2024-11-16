INSERT INTO goal.todo_lists (username, list_name, game_id)
values (?, ?, ?) ON DUPLICATE KEY UPDATE list_name=list_name;