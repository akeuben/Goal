SELECT *
FROM goal.developed_games JOIN goal.games ON goal.developed_games.game_id = goal.games.game_id
WHERE username=?;