UPDATE goal.tasks
SET description=?
WHERE username=?
AND list_name=?
AND game_id=?;
