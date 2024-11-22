SELECT * FROM (
    SELECT username, datetime, NULL as game_id, achievement_number, NULL as status, NULL as name, "achievement" as type FROM goal.achievement_timeline_entries
    UNION ALL
    SELECT username, datetime, game_id, NULL as achievement_number, status, NULL as name, "game" as type FROM goal.game_timeline_entries
    UNION ALL
    SELECT username, datetime, game_id, NULL as achievement_number, "custom" as status, name, "game" as type FROM goal.custom_game_timeline_entries
) as t
WHERE username=?