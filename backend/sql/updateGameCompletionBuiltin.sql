UPDATE goal.owned_games as og
SET og.status=?
WHERE og.username=? AND og.game_id=?