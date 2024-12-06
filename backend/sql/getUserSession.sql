SELECT * FROM (goal.user_sessions as us) JOIN (goal.users as u) ON us.username = u.username
WHERE us.token=?;
