INSERT INTO goal.owned_games (username, game_id, status)
	values (?, ?, ?) ON DUPLICATE KEY UPDATE status=?;