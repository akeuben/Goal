SELECT CASE WHEN EXISTS (
    SELECT us.username, us.token
	FROM goal.user_sessions AS us
	WHERE us.token=?
)
THEN "true"
ELSE "false" END AS tokenExists;