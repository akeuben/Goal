import { GameCompletion, GameCompletionCategory } from "@/types/completion";

export const CompletionToColor = (completion: GameCompletion, customCategories: GameCompletionCategory[]) => {
    switch(completion.status) {
        case "not_started": return "#777777";
        case "in_progress": return "#000077";
        case "complete": return "#007700";
        case "custom": return customCategories.filter(c => c.name === completion.customStatus)[0].colour;
    }
}
