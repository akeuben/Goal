UPDATE goal.owned_games as og
SET og.status="custom"
WHERE og.username=? AND og.game_id=?