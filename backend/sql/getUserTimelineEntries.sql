SELECT * FROM (SELECT username, datetime, NULL as game_id, achievement_number, NULL as name FROM goal.achievement_timeline_entries
UNION ALL
SELECT username, datetime, game_id, NULL as achievement_number, NULL as name FROM goal.game_timeline_entries
UNION ALL
SELECT username, datetime, NULL as game_id, NULL as achievement_number, name FROM goal.custom_game_timeline_entries) as t
WHERE username=?