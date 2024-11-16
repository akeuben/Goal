INSERT INTO goal.achievement_timeline_entries (username, achievement_timeline_entries, datetime)
values (?, ?, NOW()) ON DUPLICATE KEY UPDATE datetime=NOW();