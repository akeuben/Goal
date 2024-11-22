INSERT INTO goal.tasks (username, list_name, name, description, is_complete)
values (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE description=?;