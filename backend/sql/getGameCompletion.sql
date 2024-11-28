SELECT cg.* FROM goal.owned_games as cg, games as g WHERE cg.game_id=g.game_id AND cg.username=? AND cg.game_id=?;
