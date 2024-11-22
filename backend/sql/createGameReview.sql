INSERT INTO goal.game_timeline_entries (username, game_id, datetime)
values (?, ?, NOW()) ON DUPLICATE KEY UPDATE datetime=datetime
