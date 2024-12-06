import { Achievement } from "@/types/achievements";
import styles from "./AchievementCard.module.css";

export const AchievmentCompletionCard = ({achievement, unlocked, updateAchievementCompletion}:{achievement: Achievement, unlocked: boolean, updateAchievementCompletion?: (arg0: boolean) => void}) => {
    return <div className={styles.card}>
        <div>
            <b>{achievement.name}</b>
            <p>{achievement.spoiler && !unlocked ? "<hidden>" : achievement.description}</p>
        </div>
        <input type="checkbox" disabled={!updateAchievementCompletion} checked={unlocked} onChange={e => updateAchievementCompletion ? updateAchievementCompletion(e.target.checked) : undefined} />
    </div>
}
