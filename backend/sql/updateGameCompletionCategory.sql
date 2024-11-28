INSERT INTO goal.custom_game_statuses (username, name, colour, ordering)
values (?, ?, ?, ?) ON DUPLICATE KEY UPDATE colour=?, ordering=?;