UPDATE goal.tasks
SET is_complete=TRUE
WHERE username=?
AND list_name=?
AND game_id=?
AND name=?;
