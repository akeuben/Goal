INSERT INTO goal.achievement_timeline_entries
values (?, ?, NOW()) ON DUPLICATE KEY UPDATE datetime=NOW();