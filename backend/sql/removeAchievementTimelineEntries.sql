DELETE FROM goal.achievement_timeline_entries
WHERE username=?
AND achievement_number IN (
    SELECT achievement_number
    FROM achievements
    WHERE game_id=?
);