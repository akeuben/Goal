DELETE FROM goal.completed_achievements as ca
WHERE ca.username=? AND ca.achievement_number=?;
