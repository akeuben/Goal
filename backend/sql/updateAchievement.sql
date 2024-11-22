INSERT INTO goal.achievements (achievement_number, game_id, name, description, score, is_spoiler) 
VALUES (?,?,?,?,?,?) 
    ON DUPLICATE KEY UPDATE 
        game_id=VALUES(game_id), 
        name=VALUES(name), 
        description=VALUES(description), 
        score=VALUES(score), 
        is_spoiler=VALUES(is_spoiler);
