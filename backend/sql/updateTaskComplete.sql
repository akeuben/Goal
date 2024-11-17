UPDATE goal.tasks
SET is_complete=?
WHERE username=? AND list_name=? AND name=?;
