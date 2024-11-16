INSERT INTO goal.custom_game_statuses (username, name, category, colour, ordering)
values (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE category=?, colour=?, ordering=?;