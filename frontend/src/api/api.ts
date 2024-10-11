import { fakedata_getUserTodoLists } from "@/fakedata/todolist";
import { Achievement } from "@/types/achievements";
import { GameCompletion, GameCompletionCategory } from "@/types/completion";
import { Game, GameListFilter, GameListSearch, GameListSort } from "@/types/games";
import { Fail, NullSuccess, Result, Success } from "@/types/result";
import { GameReview } from "@/types/review";
import { TimelineEntry } from "@/types/timeline";
import { TodoList } from "@/types/todo";
import { User } from "@/types/user";

const BACKEND_URL = "http://localhost:4567";

const buildURL = (fn: string, args: Record<string, string | number | boolean | undefined>) => {
    const argKeys = Object.keys(args);
    if(argKeys.length == 0) return `${BACKEND_URL}/${fn}`;

    const encodedArgs = argKeys.filter(key => args[key] !== undefined).map(key => `${key}=${encodeURIComponent(args[key] as string | number | boolean )}`);

    return `${BACKEND_URL}/${fn}?${encodedArgs.join("&")}`;
}

const safeFetch = async(url: string): Promise<Response|{
    status: 600
}> => {
    let result;
    try {
        result = await fetch(url);
    } catch(e) {
        return {
            status: 600
        }
    }
    return result;
}

export const getGameList = async (sort: GameListSort, filter: GameListFilter, search: GameListSearch): Promise<Result<Game[], Error>> => {
    const response = await safeFetch(buildURL("getGameList", {
        sortBy: sort.by,
        sortAscending: sort.acending,
        filterReleaseFrom: filter.release?.from,
        filterReleaseTo: filter.release?.to,
        filterHasAchievements: filter.hasAchievements,
        search: search
    }));
    if(response.status != 200) {
        return Fail(Error(`Failed to safeFetch game list with status code ${response.status}: ${response.statusText}`));
    }
    const data = (await response.json()) as Game[];
    return Success(data);
}

export const getGame = async(game: string): Promise<Result<Game, Error>> => {
    const response = await safeFetch(buildURL("getGame", {
        game
    }));
    if(response.status != 200) {
        return Fail(Error(`Failed to safeFetch game ${game} with status code ${response.status}: ${response.statusText}`));
    }
    const data = (await response.json()) as Game;
    return Success(data);
}

export const getGameCompletions = async (username: string, sort: GameListSort, filter: GameListFilter, search: GameListSearch): Promise<Result<GameCompletion[], Error>> => {
    const response = await safeFetch(buildURL("getGameCompletions", {
        username,
        sortBy: sort.by,
        sortAscending: sort.acending,
        filterReleaseFrom: filter.release?.from,
        filterReleaseTo: filter.release?.to,
        filterHasAchievements: filter.hasAchievements,
        search: search
    }));
    if(response.status != 200) {
        return Fail(Error(`Failed to safeFetch game completions for user ${username} with status code ${response.status}: ${response.statusText}`));
    }
    const data = (await response.json()) as GameCompletion[];
    return Success(data);
}

export const getGameCompletion = async (username: string, game: string): Promise<Result<GameCompletion, Error>> => {
    const response = await safeFetch(buildURL("getGameCompletion", {
        username,
        game
    }));
    if(response.status != 200) {
        return Fail(Error(`Failed to safeFetch game completions for user ${username} with status code ${response.status}: ${response.statusText}`));
    }
    const data = (await response.json()) as GameCompletion;
    return Success(data);
}

export const getGameCompletionCategories = async (username: string): Promise<Result<GameCompletionCategory[], Error>> => {
    const response = await safeFetch(buildURL("getGameCompletionCategories", {
        username,
    }));
    if(response.status != 200) {
        return Fail(Error(`Failed to safeFetch game completion categories for user ${username} with status code ${response.status}: ${response.statusText}`));
    }
    const data = (await response.json()) as GameCompletionCategory[];
    return Success(data);
}

export const updateGameCompletionCategoryName = async (username: string, oldName: string, newName: string): Promise<Result<undefined, Error>> => {
    const response = await safeFetch(buildURL("updateGameCompletionCategoryName", {
        username,
        oldName,
        newName
    }));
    if(response.status != 200) {
        return Fail(Error(`Failed to update game completion category for user ${username} with status code ${response.status}: ${response.statusText}`));
    }
    return NullSuccess();
}

export const updateGameCompletionCategoryColour = async (username: string, name: string, colour: string): Promise<Result<undefined, Error>> => {
    const response = await safeFetch(buildURL("updateGameCompletionCategoryName", {
        username,
        name,
        colour
    }));
    if(response.status != 200) {
        return Fail(Error(`Failed to update game completion category for user ${username} with status code ${response.status}: ${response.statusText}`));
    }
    return NullSuccess();
}

export const updateGameCompletionBuiltin = async (username: string, game: string, completionCategory: GameCompletion["status"]): Promise<Result<undefined, Error>> => {
    const response = await safeFetch(buildURL("updateGameCompletionBuiltin", {
        username,
        game,
        completionCategory
    }));
    if(response.status != 200) {
        return Fail(Error(`Failed to update game completion category for user ${username} for game ${game} with status code ${response.status}: ${response.statusText}`));
    }
    return NullSuccess();
}

export const updateGameCompletionCustom = async (username: string, game: string, completionCategory: string): Promise<Result<undefined, Error>>  => {
    const response = await safeFetch(buildURL("updateGameCompletionCustom", {
        username,
        game,
        completionCategory
    }));
    if(response.status != 200) {
        return Fail(Error(`Failed to update game completion category for user ${username} for game ${game} with status code ${response.status}: ${response.statusText}`));
    }
    return NullSuccess();
}

export const getGameAchievements = async (game: string): Promise<Result<Achievement[], Error>>  => {
    const response = await safeFetch(buildURL("getGameAchievements", {
        game,
    }));
    if(response.status != 200) {
        return Fail(Error(`Failed to safeFetch game achievements for ${game} with status code ${response.status}: ${response.statusText}`));
    }
    const data = (await response.json()) as Achievement[];
    return Success(data);
}

export const getUser = async (username: string): Promise<Result<User,Error>> => {
    const response = await safeFetch(buildURL("getUser", {
        username
    }));
    if(response.status != 200) {
        return Fail(Error(`Failed to safeFetch user ${username} with status code ${response.status}: ${response.statusText}`));
    }
    const data = (await response.json()) as User;
    return Success(data);
}

export const getUserScore = async (username: string): Promise<Result<number, Error>> => {
    const response = await safeFetch(buildURL("getUserScore", {
        username
    }));
    if(response.status != 200) {
        return Fail(Error(`Failed to safeFetch user ${username}'s score with status code ${response.status}: ${response.statusText}`));
    }
    const data = (await response.json()) as number;
    return Success(data);
}

export const getUserAchievements = async (username: string, game: string): Promise<Result<Achievement[], Error>> => {
    const response = await safeFetch(buildURL("getUserAchievements", {
        username,
        game
    }));
    if(response.status != 200) {
        return Fail(Error(`Failed to safeFetch achievements for ${username} for ${game} with status code ${response.status}: ${response.statusText}`));
    }
    const data = (await response.json()) as Achievement[];
    return Success(data);
}

export const updateUserAchievementState = async (username: string, achievement: number, unlocked: boolean): Promise<Result<undefined, Error>> => {
    const response = await safeFetch(buildURL("updateUserAchievementState", {
        username,
        achievement,
        unlocked,
    }));
    if(response.status != 200) {
        return Fail(Error(`Failed to update achievement for ${username} for achievement ${achievement} with status code ${response.status}: ${response.statusText}`));
    }
    return NullSuccess();
}

export const getUserTimelineEntries = async (username: string): Promise<Result<TimelineEntry[], Error>> => {
    const response = await safeFetch(buildURL("getUserTimelineEntries", {
        username,
    }));
    if(response.status != 200) {
        return Fail(Error(`Failed to safeFetch timeline for ${username} with status code ${response.status}: ${response.statusText}`));
    }
    const data = (await response.json()) as TimelineEntry[];
    return Success(data);
}

export const getGameReview = async(username: string, game: string): Promise<Result<GameReview, Error>> => {
    const response = await safeFetch(buildURL("getGameReview", {
        username,
        game,
    }));
    if(response.status != 200) {
        return Fail(Error(`Failed to safeFetch review for ${game} by ${username} with status code ${response.status}: ${response.statusText}`));
    }
    const data = (await response.json()) as GameReview;
    return Success(data);
}

export const setGameReviewText = async(username: string, game: string, text: string): Promise<Result<undefined, Error>> => {
    const response = await safeFetch(buildURL("setGameReviewText", {
        username,
        game,
        text
    }));
    if(response.status != 200) {
        return Fail(Error(`Failed to update review for ${username} for game ${game} with status code ${response.status}: ${response.statusText}`));
    }
    return NullSuccess();
}

export const setGameReviewRating = async(username: string, game: string, rating: number): Promise<Result<undefined, Error>> => {
    const response = await safeFetch(buildURL("setGameReviewRating", {
        username,
        game,
        rating
    }));
    if(response.status != 200) {
        return Fail(Error(`Failed to update review for ${username} for game ${game} with status code ${response.status}: ${response.statusText}`));
    }
    return NullSuccess();
}

export const getUserTodoLists = async(username: string, game: string): Promise<Result<TodoList[], Error>> => {
    const data = await fakedata_getUserTodoLists(username, game);
    return Success(data);
}

export const updateUserTodoListName = async(username: string, game: string, list: string, name: string): Promise<Result<undefined,Error>> => {
    return Fail(Error("Not implemented!"));
}

export const updateUserTodoListEntryName = async(username: string, game: string, list: string, entry: string, name: string): Promise<Result<undefined,Error>> => {
    return Fail(Error("Not implemented!"));
}

export const updateUserTodoListEntryDescription = async(username: string, game: string, list: string, entry: string, description: string): Promise<Result<undefined,Error>> => {
    return Fail(Error("Not implemented!"));
}

export const updateUserTodoListEntryComplete = async(username: string, game: string, list: string, entry: string, complete: boolean): Promise<Result<undefined,Error>> => {
    return Fail(Error("Not implemented!"));
}

export const addUserTodoListEntry = async(username: string, game: string, list: string, name: string, description: string): Promise<Result<undefined, Error>> => {
    return Fail(Error("Not implemented!"));
}

export const addUserTodoList = async(username: string, game: string, name: string): Promise<Result<undefined, Error>> => {
    return Fail(Error("Not implemented!"));
}
