import { fakedata_getGameAcheivements, fakedata_getUserAcheivements, fakedata_updateUserAchievementState } from "@/fakedata/achievements";
import { fakedata_getCompletionCategories, fakedata_updateGameCompletionBuiltin, fakedata_updateGameCompletionCategoryColour, fakedata_updateGameCompletionCategoryName, fakedata_updateGameCompletionCustom } from "@/fakedata/completion";
import { fakedata_getGameReview, fakedata_setGameReviewRating, fakedata_setGameReviewText } from "@/fakedata/review";
import { fakedata_getUserTimelineEntries } from "@/fakedata/timeline";
import { fakedata_getUser, fakedata_getUserScore } from "@/fakedata/users";
import { Achievement } from "@/types/achievements";
import { GameCompletion, GameCompletionCategory } from "@/types/completion";
import { Game, GameListFilter, GameListSearch, GameListSort } from "@/types/games";
import { Fail, MakeResultFromNull, NullSuccess, Result, Success } from "@/types/result";
import { GameReview } from "@/types/review";

const BACKEND_URL = "http://localhost:4567";

const buildURL = (fn: string, args: Record<string, string | number | boolean | undefined>) => {
    const argKeys = Object.keys(args);
    if(argKeys.length == 0) return `${BACKEND_URL}/${fn}`;

    const encodedArgs = argKeys.filter(key => args[key] !== undefined).map(key => `${key}=${encodeURIComponent(args[key] as string | number | boolean )}`);

    return `${BACKEND_URL}/${fn}?${encodedArgs.join("&")}`;
}

export const getGameList = async (sort: GameListSort, filter: GameListFilter, search: GameListSearch): Promise<Result<Game[], Error>> => {
    const response = await fetch(buildURL("getGameList", {
        sortBy: sort.by,
        sortAscending: sort.acending,
        filterReleaseFrom: filter.release?.from,
        filterReleaseTo: filter.release?.to,
        filterHasAchievements: filter.hasAchievements,
        search: search
    }));
    if(response.status != 200) {
        return Fail(Error(`Failed to fetch game list with status code ${response.status}: ${response.statusText}`));
    }
    const data = (await response.json()) as Game[];
    return Success(data);
}

export const getGame = async(game: string): Promise<Result<Game, Error>> => {
    const response = await fetch(buildURL("getGame", {
        game
    }));
    if(response.status != 200) {
        return Fail(Error(`Failed to fetch game ${game} with status code ${response.status}: ${response.statusText}`));
    }
    const data = (await response.json()) as Game;
    return Success(data);
}

export const getGameCompletions = async (username: string, sort: GameListSort, filter: GameListFilter, search: GameListSearch): Promise<Result<GameCompletion[], Error>> => {
    const response = await fetch(buildURL("getGameCompletions", {
        username,
        sortBy: sort.by,
        sortAscending: sort.acending,
        filterReleaseFrom: filter.release?.from,
        filterReleaseTo: filter.release?.to,
        filterHasAchievements: filter.hasAchievements,
        search: search
    }));
    if(response.status != 200) {
        return Fail(Error(`Failed to fetch game completions for user ${username} with status code ${response.status}: ${response.statusText}`));
    }
    const data = (await response.json()) as GameCompletion[];
    return Success(data);
}

export const getGameCompletion = async (username: string, game: string): Promise<Result<GameCompletion, Error>> => {
    const response = await fetch(buildURL("getGameCompletion", {
        username,
        game
    }));
    if(response.status != 200) {
        return Fail(Error(`Failed to fetch game completions for user ${username} with status code ${response.status}: ${response.statusText}`));
    }
    const data = (await response.json()) as GameCompletion;
    return Success(data);
}

export const getGameCompletionCategories = async (username: string): Promise<Result<GameCompletionCategory[], Error>> => {
    const response = await fetch(buildURL("getGameCompletionCategories", {
        username,
    }));
    if(response.status != 200) {
        return Fail(Error(`Failed to fetch game completion categories for user ${username} with status code ${response.status}: ${response.statusText}`));
    }
    const data = (await response.json()) as GameCompletionCategory[];
    return Success(data);
}

export const updateGameCompletionCategoryName = async (username: string, oldName: string, newName: string): Promise<Result<undefined, Error>> => {
    const response = await fetch(buildURL("updateGameCompletionCategoryName", {
        username,
        oldName,
        newName
    }));
    if(response.status != 200) {
        return Fail(Error(`Failed to update game completion category for user ${username} with status code ${response.status}: ${response.statusText}`));
    }
    return NullSuccess();
}

export const updateGameCompletionCategoryColour = async (username: string, name: string, colour: string) => {
    const response = await fetch(buildURL("updateGameCompletionCategoryName", {
        username,
        name,
        colour
    }));
    if(response.status != 200) {
        return Fail(Error(`Failed to update game completion category for user ${username} with status code ${response.status}: ${response.statusText}`));
    }
    return NullSuccess();
}

export const updateGameCompletionBuiltin = async (username: string, game: string, completionCategory: GameCompletion["status"]) => {
    const response = await fetch(buildURL("updateGameCompletionBuiltin", {
        username,
        game,
        completionCategory
    }));
    if(response.status != 200) {
        return Fail(Error(`Failed to update game completion category for user ${username} for game ${game} with status code ${response.status}: ${response.statusText}`));
    }
    return NullSuccess();
}

export const updateGameCompletionCustom = async (username: string, game: string, completionCategory: string) => {
    const response = await fetch(buildURL("updateGameCompletionCustom", {
        username,
        game,
        completionCategory
    }));
    if(response.status != 200) {
        return Fail(Error(`Failed to update game completion category for user ${username} for game ${game} with status code ${response.status}: ${response.statusText}`));
    }
    return NullSuccess();
}

export const getGameAchievements = async (game: string) => {
    const response = await fetch(buildURL("getGameAchievements", {
        game,
    }));
    if(response.status != 200) {
        return Fail(Error(`Failed to fetch game achievements for ${game} with status code ${response.status}: ${response.statusText}`));
    }
    const data = (await response.json()) as Achievement[];
    return Success(data);
}

export const getUser = async (username: string) => {
    const response = await fetch(buildURL("getUser", {
        username
    }));
    if(response.status != 200) {
        return Fail(Error(`Failed to fetch user ${username} with status code ${response.status}: ${response.statusText}`));
    }
    const data = (await response.json()) as Achievement[];
    return Success(data);
}

export const getUserScore = async (username: string) => {
    const response = await fetch(buildURL("getUserScore", {
        username
    }));
    if(response.status != 200) {
        return Fail(Error(`Failed to fetch user ${username}'s score with status code ${response.status}: ${response.statusText}`));
    }
    const data = (await response.json()) as number;
    return Success(data);
}

export const getUserAchievements = async (username: string, game: string): Promise<Result<Achievement[], Error>> => {
    const response = await fetch(buildURL("getUserScore", {
        username,
        game
    }));
    if(response.status != 200) {
        return Fail(Error(`Failed to fetch achievements for ${username} for ${game} with status code ${response.status}: ${response.statusText}`));
    }
    const data = (await response.json()) as Achievement[];
    return Success(data);
}

export const updateUserAchievementState = async (username: string, achievement: number, unlocked: boolean) => {
    const response = await fetch(buildURL("updateUserAchievementState", {
        username,
        achievement,
        unlocked,
    }));
    if(response.status != 200) {
        return Fail(Error(`Failed to update achievement for ${username} for achievement ${achievement} with status code ${response.status}: ${response.statusText}`));
    }
    return NullSuccess();
}

export const getUserTimelineEntries = async (username: string) => {
    const response = await fetch(buildURL("getUserTimelineEntries", {
        username,
    }));
    if(response.status != 200) {
        return Fail(Error(`Failed to fetch timeline for ${username} with status code ${response.status}: ${response.statusText}`));
    }
    const data = (await response.json()) as Achievement[];
    return Success(data);
}

export const getGameReview = async(username: string, game: string): Promise<Result<GameReview, Error>> => {
    const response = await fetch(buildURL("getGameReview", {
        username,
        game,
    }));
    if(response.status != 200) {
        return Fail(Error(`Failed to fetch review for ${game} by ${username} with status code ${response.status}: ${response.statusText}`));
    }
    const data = (await response.json()) as GameReview;
    return Success(data);
}

export const setGameReviewText = async(username: string, game: string, text: string): Promise<Result<undefined, Error>> => {
    const response = await fetch(buildURL("setGameReviewText", {
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
    const response = await fetch(buildURL("setGameReviewText", {
        username,
        game,
        rating
    }));
    if(response.status != 200) {
        return Fail(Error(`Failed to update review for ${username} for game ${game} with status code ${response.status}: ${response.statusText}`));
    }
    return NullSuccess();
}
