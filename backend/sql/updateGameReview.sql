INSERT INTO goal.game_reviews (username, game_id, timestamp, last_edited, text, rating)
values (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE last_edited=NOW(), text=?, rating=?;