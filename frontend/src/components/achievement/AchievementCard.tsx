import styles from "./AchievementCard.module.css";
import { Achievement } from "@/types/achievements";

export const AchievementCard = ({achievement}: {achievement: Achievement}) => {
    return <div className={styles.card}>
        <div>
            <b>{achievement.name}</b>
            <p>{achievement.description}</p>
        </div>
        <p>{achievement.score} Points</p>
    </div>

}
