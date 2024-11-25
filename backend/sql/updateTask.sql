INSERT INTO goal.tasks (username, list_name, game_id, name, description, is_complete)
values (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE description=?;