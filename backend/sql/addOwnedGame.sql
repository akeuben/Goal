INSERT INTO goal.owned_games AS og (username, game_id, status)
	values (?, ?, ?) ON DUPLICATE KEY UPDATE og.status=?;