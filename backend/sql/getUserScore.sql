select sum(a.score) as score from goal.completed_achievements as ca, goal.achievements as a where ca.achievement_number = a.achievement_number and ca.username=?