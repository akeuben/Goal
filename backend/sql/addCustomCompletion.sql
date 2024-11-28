INSERT INTO goal.custom_status_used
VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE name=?;