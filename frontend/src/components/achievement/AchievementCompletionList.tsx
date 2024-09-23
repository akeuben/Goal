"use client"

import { getGameAchievements, getUserAchievements, updateUserAchievementState } from "@/api/api";
import { Achievement } from "@/types/achievements";
import { Game } from "@/types/games";
import { User } from "@/types/user";
import { useEffect, useState } from "react";
import { AchievmentCompletionCard } from "./AchievementCompletionCard";

export const AchievementCompletionList = ({user, game, canEdit = true}: {user: User, game: Game, canEdit?: boolean}) => {
    const [achievements, setAchievements] = useState<Achievement[] | null>(null);
    const [userAchievements, setUserAcheivements] = useState<Achievement[] | null>(null);

    useEffect(() => {
        getGameAchievements(game.identifier).then(result => setAchievements(result.success ? result.value : []));
        getUserAchievements(user.username, game.identifier).then(result => setUserAcheivements(result.success ? result.value : []));
    }, [setAchievements, setUserAcheivements, game, user])

    if(!userAchievements || !achievements) return <></>

    let unlocked: Achievement[] = [];
    let locked: Achievement[] = [];

    const unlockedIdentifiers = userAchievements.map(a => a.identifier);
    unlocked = userAchievements;
    locked = achievements.filter(a => !unlockedIdentifiers.includes(a.identifier));

    const toggleAchievement = (a: Achievement, v: boolean) => {
        updateUserAchievementState(user.username, a.identifier, v).then(result => {
            if(result.success) {
                let clone = structuredClone(userAchievements);
                clone = clone.filter(a2 => a.identifier !== a2.identifier);
                if(v) clone.push(a);
                setUserAcheivements(clone);
            }
        })
    }

    return <div>
        {achievements.length === 0 ? <p>No achievements for this game</p> : <>
            {unlocked.sort((a,b) => a.identifier - b.identifier).map(a => <AchievmentCompletionCard key={a.identifier} achievement={a} unlocked={true} updateAchievementCompletion={canEdit ? toggleAchievement.bind(null, a) : undefined} />)}
            {locked.sort((a,b) => a.identifier - b.identifier).map(a => <AchievmentCompletionCard key={a.identifier} achievement={a} unlocked={false} updateAchievementCompletion={canEdit ? toggleAchievement.bind(null, a) : undefined} />)}
        </>}
    </div>
}
