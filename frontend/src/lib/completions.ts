import { GameCompletion, GameCompletionCategory } from "@/types/completion";

export const CompletionToColor = (status: GameCompletion['status'], customStatus: string | null, customCategories: GameCompletionCategory[]) => {
    switch(status) {
        case "not_started": return "#777777";
        case "in_progress": return "#7FDDF4";
        case "complete": return "#7FF48D";
        case "custom": {
            const categories = customCategories.filter(c => c.name === customStatus);
            if(categories.length === 0) return "#777777";
            return categories[0].colour;
        }
    }
}
