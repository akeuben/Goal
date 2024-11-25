DELETE FROM goal.completed_achievements WHERE username=?
AND achievement_number IN (
    SELECT achievement_number
    FROM goal.achievements
    WHERE game_id=?
);