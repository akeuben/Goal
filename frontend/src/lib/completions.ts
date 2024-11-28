import { GameCompletion, GameCompletionCategory } from "@/types/completion";

export const CompletionToColor = (status: GameCompletion['status'], customStatus: string | null, customCategories: GameCompletionCategory[]) => {
    console.log(status);
    console.log(customStatus);
    console.log(customCategories);
    switch(status) {
        case "not_started": return "#777777";
        case "in_progress": return "#000077";
        case "complete": return "#007700";
        case "custom": {
            const categories = customCategories.filter(c => c.name === customStatus);
            if(categories.length === 0) return "#777777";
            return categories[0].colour;
        }
    }
}
