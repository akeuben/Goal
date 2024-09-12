import { GameCompletion, GameCompletionCategory } from "@/types/completion";
import { Game, GameListFilter, GameListSearch, GameListSort } from "@/types/games";
import { fakedata_getGame } from "./games";

type IncompleteGameCompletion = {
    game: string,
    user: string,
    status: 'not_started' | 'in_progress' | 'complete' | 'custom'
    customStatus: string | null
}

export const fakedata_getCompletions = async (username: string, sort: GameListSort, filter: GameListFilter, search: GameListSearch) => {
    const filterGames = (completion: GameCompletion) => {
        if(filter.release) {
            if(completion.game.releaseYear < filter.release.from) return false;
            if(completion.game.releaseYear > filter.release.to) return false;
        }
        if(filter.hasAchievements) {
            // TODO
        }
        return true;
    }

    const sortGames = (a: GameCompletion, b: GameCompletion) => {
        switch(sort.by) {
            case 'name':
                if(sort.acending) return a.game.name.localeCompare(b.game.name);
                return b.game.name.localeCompare(a.game.name);
            case 'release':
                if(sort.acending) return a.game.releaseYear - b.game.releaseYear;
                return b.game.releaseYear - a.game.releaseYear;
            default:
                throw new Error("Sort method not implemented.");
        }
    }

    const result = await fetch("http://localhost:3000/completion.json");
    const completions = (await result.json()) as IncompleteGameCompletion[];

    const userCompletionList: GameCompletion[] = await Promise.all(completions.filter(c => c.user === username).map(async (completion) => {
        const game = await fakedata_getGame(completion.game);
        const completeCompletion: GameCompletion = {
            game: game,
            user: completion.user,
            status: completion.status,
            customStatus: completion.customStatus
        }
        return completeCompletion;
    }))

    const gameList = userCompletionList 
        .filter(completion => search ? completion.game.name.includes(search) : true)
        .filter(filterGames)
        .toSorted(sortGames);

    return gameList;
}

export const fakedata_getCompletion = async (username: string, game: string) => {
    const result = await fetch("http://localhost:3000/completion.json");
    const completions = (await result.json()) as IncompleteGameCompletion[];

    const incomplete = completions.filter(c => c.user === username && c.game === game)[0] || null;

    console.log(completions);

    if(!incomplete) return null;

    const complete: GameCompletion = {
        game: await fakedata_getGame(incomplete.game),
        user: incomplete.user,
        status: incomplete.status,
        customStatus: incomplete.customStatus
    };

    return complete;
}

export const fakedata_updateGameCompletionBuiltin = async (username: string, game: string, completionCategory: GameCompletion["status"]) => {
    const result = await fetch("http://localhost:3000/completion.json");
    const completions = (await result.json()) as IncompleteGameCompletion[];

    const entry = completions.filter(c => c.user === username && c.game === game)[0];
    entry.status = completionCategory;
    entry.customStatus = null;

    console.log(JSON.stringify(completions, null, 4));
}

export const fakedata_updateGameCompletionCustom = async (username: string, game: string, completionCategory: string) => {
    const result = await fetch("http://localhost:3000/completion.json");
    const completions = (await result.json()) as IncompleteGameCompletion[];

    const entry = completions.filter(c => c.user === username && c.game === game)[0];
    entry.status = "custom";
    entry.customStatus = completionCategory;

    console.log(JSON.stringify(completions, null, 4));
}

export const fakedata_getCompletionCategories = async (username: string) => {
    const result = await fetch("http://localhost:3000/category.json");
    const categories = (await result.json()) as GameCompletionCategory[];

    return categories.filter(c => c.user === username).toSorted((a, b) => a.order - b.order);
}

export const fakedata_updateGameCompletionCategoryName = async (username: string, oldName: string, newName: string) => {
    const result = await fetch("http://localhost:3000/category.json");
    const categories = (await result.json()) as GameCompletionCategory[];

    const category = categories.filter(c => c.user === username && c.name === oldName)[0];
    category.name = newName;

    console.log(JSON.stringify(categories, null, 4));
}

export const fakedata_updateGameCompletionCategoryColour = async (username: string, name: string, colour: string) => {
    const result = await fetch("http://localhost:3000/category.json");
    const categories = (await result.json()) as GameCompletionCategory[];

    const category = categories.filter(c => c.user === username && c.name === name)[0];
    category.colour = colour;

    console.log(JSON.stringify(categories, null, 4));
}
