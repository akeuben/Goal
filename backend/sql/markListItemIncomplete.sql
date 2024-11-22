UPDATE goal.tasks
SET is_complete=FALSE
WHERE username=?
AND list_name=?
AND game_id=?
AND name=?;
