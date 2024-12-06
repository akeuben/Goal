"use client"
import { GameCompletion, GameCompletionCategory } from "@/types/completion";
import { useState } from "react";
import { GameCompletionCard } from "./GameCompletionCard";

export const WrappedGameCompletionCard = ({initialCompletion, categories, canEdit = true}: {initialCompletion: GameCompletion, categories: GameCompletionCategory[], canEdit?: boolean}) => {
    const [completion, setCompletion] = useState<GameCompletion>(initialCompletion);

    const updateCompletion = (_: string, status: GameCompletion["status"], customStatus: string | null) => {
        const newCompletion = structuredClone(completion);

        newCompletion.status = status;
        if(newCompletion.status === "custom") {
            newCompletion.customStatus = categories?.filter((c) => c.name == customStatus)[0] as GameCompletionCategory;
        }

        setCompletion(newCompletion);
    }

    return <GameCompletionCard gameCompletion={completion} categories={categories} setCompletion={canEdit ? updateCompletion : undefined} detailsPage={""} showAchievements={false} />
}
