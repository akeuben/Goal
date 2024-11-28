SELECT c.username, c.name, c.colour, c.ordering
FROM goal.custom_game_statuses AS c, goal.custom_status_used AS u
WHERE c.username = u.username
AND c.name = u.name
AND u.username=?
AND u.game_id=?;