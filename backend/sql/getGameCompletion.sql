SELECT CASE WHEN EXISTS (
    SELECT cg.username, cg.game_id
	FROM goal.completed_games AS cg
	WHERE cg.username=? AND cg.game_id=?
)
THEN "true"
ELSE "false" END AS gameCompleted