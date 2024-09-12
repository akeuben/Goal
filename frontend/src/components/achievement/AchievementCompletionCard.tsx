import { Achievement } from "@/types/achievements";
import styles from "./AchievementCard.module.css";

export const AchievmentCompletionCard = ({achievement, unlocked, user, updateAchievementCompletion}:{achievement: Achievement, unlocked: boolean, user: string, updateAchievementCompletion?: (arg0: boolean) => void}) => {
    return <div className={styles.card}>
        <div>
            <b>{achievement.name}</b>
            <p>{achievement.description}</p>
        </div>
        <input type="checkbox" disabled={!updateAchievementCompletion} checked={unlocked} onChange={e => updateAchievementCompletion ? updateAchievementCompletion(e.target.checked) : undefined} />
    </div>
}
