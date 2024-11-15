INSERT INTO goal.completed_achievements (username, achievement_number)
values (?, ?) ON DUPLICATE KEY UPDATE username=username, achievement_number=achievement_number;