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

const safeFetch = async(url: string): Promise<Response|Error> => {
    let result;
    try {
        result = await fetch(url, {
            cache: "no-cache",
        });
    } catch(e: any) {
        return Error(e);
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
    if(response instanceof Error) {
        return Fail(response);
    }
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
    if(response instanceof Error) {
        return Fail(response);
    }
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
    if(response instanceof Error) {
        return Fail(response);
    }
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
    if(response instanceof Error) {
        return Fail(response);
    }
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
    if(response instanceof Error) {
        return Fail(response);
    }
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
    if(response instanceof Error) {
        return Fail(response);
    }
    if(response.status != 200) {
        return Fail(Error(`Failed to update game completion category for user ${username} with status code ${response.status}: ${response.statusText}`));
    }
    return NullSuccess();
}

export const updateGameCompletionCategoryColour = async (username: string, name: string, colour: string): Promise<Result<undefined, Error>> => {
    const response = await safeFetch(buildURL("updateGameCompletionCategoryColour", {
        username,
        name,
        colour
    }));
    if(response instanceof Error) {
        return Fail(response);
    }
    if(response.status != 200) {
        return Fail(Error(`Failed to update game completion category for user ${username} with status code ${response.status}: ${response.statusText}`));
    }
    return NullSuccess();
}

export const updateGameCompletionCategoryOrder = async (username: string, name: string, direction: "next" | "prev"): Promise<Result<GameCompletionCategory[], Error>> => {
    const response = await safeFetch(buildURL("updateGameCompletionCategoryOrder", {
        username,
        name,
        direction
    }));
    if(response instanceof Error) {
        return Fail(response);
    }
    if(response.status != 200) {
        return Fail(Error(`Failed to update game completion category for user ${username} with status code ${response.status}: ${response.statusText}`));
    }
    const data = (await response.json()) as GameCompletionCategory[];
    return Success(data);
}

export const createGameCompletionCategory = async (username: string, name: string): Promise<Result<undefined, Error>> => {
    const response = await safeFetch(buildURL("createGameCompletionCategory", {
        username,
        name,
    }));
    if(response instanceof Error) {
        return Fail(response);
    }
    if(response.status != 200) {
        return Fail(Error(`Failed to update create completion category for user ${username} with status code ${response.status}: ${response.statusText}`));
    }
    return NullSuccess();
}

export const removeGameCompletionCategory = async (username: string, name: string): Promise<Result<undefined, Error>> => {
    const response = await safeFetch(buildURL("removeGameCompletionCategory", {
        username,
        name,
    }));
    if(response instanceof Error) {
        return Fail(response);
    }
    if(response.status != 200) {
        return Fail(Error(`Failed to remove completion category for user ${username} with status code ${response.status}: ${response.statusText}`));
    }
    return NullSuccess();
}

export const updateGameCompletionBuiltin = async (username: string, game: string, completionCategory: GameCompletion["status"]): Promise<Result<undefined, Error>> => {
    const response = await safeFetch(buildURL("updateGameCompletionBuiltin", {
        username,
        game,
        completionCategory
    }));
    if(response instanceof Error) {
        return Fail(response);
    }
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
    if(response instanceof Error) {
        return Fail(response);
    }
    if(response.status != 200) {
        return Fail(Error(`Failed to update game completion category for user ${username} for game ${game} with status code ${response.status}: ${response.statusText}`));
    }
    return NullSuccess();
}

export const getGameAchievements = async (game: string): Promise<Result<Achievement[], Error>>  => {
    const response = await safeFetch(buildURL("getGameAchievements", {
        game,
    }));
    if(response instanceof Error) {
        return Fail(response);
    }
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
    if(response instanceof Error) {
        return Fail(response);
    }
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
    if(response instanceof Error) {
        return Fail(response);
    }
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
    if(response instanceof Error) {
        return Fail(response);
    }
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
    if(response instanceof Error) {
        return Fail(response);
    }
    if(response.status != 200) {
        return Fail(Error(`Failed to update achievement for ${username} for achievement ${achievement} with status code ${response.status}: ${response.statusText}`));
    }
    return NullSuccess();
}

export const getUserTimelineEntries = async (username: string): Promise<Result<TimelineEntry[], Error>> => {
    const response = await safeFetch(buildURL("getUserTimelineEntries", {
        username,
    }));
    if(response instanceof Error) {
        return Fail(response);
    }
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
    if(response instanceof Error) {
        return Fail(response);
    }
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
    if(response instanceof Error) {
        return Fail(response);
    }
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
    if(response instanceof Error) {
        return Fail(response);
    }
    if(response.status != 200) {
        return Fail(Error(`Failed to update review for ${username} for game ${game} with status code ${response.status}: ${response.statusText}`));
    }
    return NullSuccess();
}

export const getUserTodoLists = async(username: string, game: string): Promise<Result<TodoList[], Error>> => {
    const response = await safeFetch(buildURL("getUserTodoLists", {
        username,
        game,
    }));
    if(response instanceof Error) {
        return Fail(response);
    }
    if(response.status != 200) {
        return Fail(Error(`Failed to get todo lists for user ${username} for game ${game} with status code ${response.status}: ${response.statusText}`));
    }
    const result = await response.json() as TodoList[];
    return Success(result);
}

export const updateUserTodoListName = async(username: string, game: string, list: string, name: string): Promise<Result<undefined,Error>> => {
    const response = await safeFetch(buildURL("updateUserTodoListName", {
        username,
        game,
        list,
        name,
    }));
    if(response instanceof Error) {
        return Fail(response);
    }
    if(response.status != 200) {
        return Fail(Error(`Failed to update list for ${username} for game ${game} with status code ${response.status}: ${response.statusText}`));
    }
    return NullSuccess();
}

export const updateUserTodoListEntryName = async(username: string, game: string, list: string, entry: string, name: string): Promise<Result<undefined,Error>> => {
    const response = await safeFetch(buildURL("updateUserTodoListEntryName", {
        username,
        game,
        list,
        entry,
        name,
    }));
    if(response instanceof Error) {
        return Fail(response);
    }
    if(response.status != 200) {
        return Fail(Error(`Failed to update list for ${username} for game ${game} with status code ${response.status}: ${response.statusText}`));
    }
    return NullSuccess();
}

export const updateUserTodoListEntryDescription = async(username: string, game: string, list: string, entry: string, description: string): Promise<Result<undefined,Error>> => {
    const response = await safeFetch(buildURL("updateUserTodoListEntryDescription", {
        username,
        game,
        list,
        entry,
        description,
    }));
    if(response instanceof Error) {
        return Fail(response);
    }
    if(response.status != 200) {
        return Fail(Error(`Failed to update list for ${username} for game ${game} with status code ${response.status}: ${response.statusText}`));
    }
    return NullSuccess();
}

export const updateUserTodoListEntryComplete = async(username: string, game: string, list: string, entry: string, complete: boolean): Promise<Result<undefined,Error>> => {
    const response = await safeFetch(buildURL("updateUserTodoListEntryComplete", {
        username,
        game,
        list,
        entry,
        complete,
    }));
    if(response instanceof Error) {
        return Fail(response);
    }
    if(response.status != 200) {
        return Fail(Error(`Failed to update list for ${username} for game ${game} with status code ${response.status}: ${response.statusText}`));
    }
    return NullSuccess();
}

export const addUserTodoListEntry = async(username: string, game: string, list: string, name: string, description: string): Promise<Result<undefined, Error>> => {
    const response = await safeFetch(buildURL("addUserTodoListEntry", {
        username,
        game,
        list,
        name,
        description,
    }));
    if(response instanceof Error) {
        return Fail(response);
    }
    if(response.status != 200) {
        return Fail(Error(`Failed to update list for ${username} for game ${game} with status code ${response.status}: ${response.statusText}`));
    }
    return NullSuccess();
}

export const addUserTodoList = async(username: string, game: string, list: string): Promise<Result<undefined, Error>> => {
    const response = await safeFetch(buildURL("createUserTodoList", {
        username,
        game,
        list,
    }));
    if(response instanceof Error) {
        return Fail(response);
    }
    if(response.status != 200) {
        return Fail(Error(`Failed to create list for ${username} for game ${game} with status code ${response.status}: ${response.statusText}`));
    }
    return NullSuccess();
}

export const removeUserTodoListEntry = async(username: string, game: string, list: string, entry: string): Promise<Result<undefined,Error>> => {
    const response = await safeFetch(buildURL("removeUserTodoListEntry", {
        username,
        game,
        list,
        entry,
    }));
    if(response instanceof Error) {
        return Fail(response);
    }
    if(response.status != 200) {
        return Fail(Error(`Failed to update list for ${username} for game ${game} with status code ${response.status}: ${response.statusText}`));
    }
    return NullSuccess();
}

export const removeUserTodoList = async(username: string, game: string, list: string): Promise<Result<undefined,Error>> => {
    const response = await safeFetch(buildURL("removeUserTodoList", {
        username,
        game,
        list,
    }));
    if(response instanceof Error) {
        return Fail(response);
    }
    if(response.status != 200) {
        return Fail(Error(`Failed to create list for ${username} for game ${game} with status code ${response.status}: ${response.statusText}`));
    }
    return NullSuccess();
}

export const addGameToLibrary = async(username: string, game: string): Promise<Result<undefined, Error>> => {
    const response = await safeFetch(buildURL("addGameToLibrary", {
        username,
        game,
    }));
    if(response instanceof Error) {
        return Fail(response);
    }
    if(response.status != 200) {
        return Fail(Error(`Failed to add game to library for ${username} for game ${game} with status code ${response.status}: ${response.statusText}`));
    }
    return NullSuccess();
}

export const removeGameFromLibrary = async(username: string, game: string): Promise<Result<undefined, Error>> => {
    const response = await safeFetch(buildURL("removeGameFromLibrary", {
        username,
        game,
    }));
    if(response instanceof Error) {
        return Fail(response);
    }
    if(response.status != 200) {
        return Fail(Error(`Failed to remove game from library for ${username} for game ${game} with status code ${response.status}: ${response.statusText}`));
    }
    return NullSuccess();
}

export const sendLoginRequest = async(username: string, password: string): Promise<Result<undefined, Error>> => {
    const response = await safeFetch(buildURL("login", {
        username,
        password
    }));
    if(response instanceof Error) {
        return Fail(response);
    }
    if(response.status != 200) {
        return Fail(Error(`Authentication error: ${response.statusText}`));
    }
    return NullSuccess();
}

export const getGamesByDeveloper = async(developer: string): Promise<Result<Game[], Error>> => {
    const response = await safeFetch(buildURL("getGamesByDeveloper", {
        developer,
    }));
    if(response instanceof Error) {
        return Fail(response);
    }
    if(response.status != 200) {
        return Fail(Error(`Authentication error: ${response.statusText}`));
    }
    const result = await response.json() as Game[];
    return Success(result);
}

export const updateGameName = async(game_id: string, name: string): Promise<Result<undefined, Error>> => {
    const response = await safeFetch(buildURL("updateGameName", {
        game_id,
        name
    }));
    if(response instanceof Error) {
        return Fail(response);
    }
    if(response.status != 200) {
        return Fail(Error(`Authentication error: ${response.statusText}`));
    }
    return NullSuccess();
}

export const updateGameDescription = async(game_id: string, description: string): Promise<Result<undefined, Error>> => {
    const response = await safeFetch(buildURL("updateGameDescription", {
        game_id,
        description
    }));
    if(response instanceof Error) {
        return Fail(response);
    }
    if(response.status != 200) {
        return Fail(Error(`Authentication error: ${response.statusText}`));
    }
    return NullSuccess();
}

export const updateGameReleaseYear = async(game_id: string, release_year: string): Promise<Result<undefined, Error>> => {
    const response = await safeFetch(buildURL("updateGameReleaseYear", {
        game_id,
        release_year
    }));
    if(response instanceof Error) {
        return Fail(response);
    }
    if(response.status != 200) {
        return Fail(Error(`Authentication error: ${response.statusText}`));
    }
    return NullSuccess();
}

export const updateGamePublisher = async(game_id: string, publisher: string): Promise<Result<undefined, Error>> => {
    const response = await safeFetch(buildURL("updateGamePublisher", {
        game_id,
        publisher
    }));
    if(response instanceof Error) {
        return Fail(response);
    }
    if(response.status != 200) {
        return Fail(Error(`Authentication error: ${response.statusText}`));
    }
    return NullSuccess();
}

export const updateAchievement = async(achievement_number: string, game_id: string, name: string, description: string, score: number, is_spoiler: boolean): Promise<Result<undefined, Error>> => {
    const response = await safeFetch(buildURL("updateAchievement", {
        achievement_number,
        game_id,
        name,
        description,
        score,
        is_spoiler: is_spoiler ? "1" : "0",
    }));
    if(response instanceof Error) {
        return Fail(response);
    }
    if(response.status != 200) {
        return Fail(Error(`Authentication error: ${response.statusText}`));
    }
    return NullSuccess();
}

export const addAchievement = async(game_id: string, name: string, description: string, score: number, is_spoiler: boolean): Promise<Result<undefined, Error>> => {
    const response = await safeFetch(buildURL("addAchievement", {
        game_id,
        name,
        description,
        score,
        is_spoiler: is_spoiler ? "1" : "0",
    }));
    if(response instanceof Error) {
        return Fail(response);
    }
    if(response.status != 200) {
        return Fail(Error(`Authentication error: ${response.statusText}`));
    }
    return NullSuccess();
}

export const removeAchievement = async(achievement_number: string): Promise<Result<undefined, Error>> => {
    const response = await safeFetch(buildURL("removeAchievement", {
        achievement_number,
    }));
    if(response instanceof Error) {
        return Fail(response);
    }
    if(response.status != 200) {
        return Fail(Error(`Authentication error: ${response.statusText}`));
    }
    return NullSuccess();
}

export const createGame = async(developer: string, name: string, description: string, release_year: number, publisher: string): Promise<Result<undefined, Error>> => {
    const response = await safeFetch(buildURL("createGame", {
        developer,
        name,
        description,
        release_year,
        publisher,
    }));
    if(response instanceof Error) {
        return Fail(response);
    }
    if(response.status != 200) {
        return Fail(Error(`Authentication error: ${response.statusText}`));
    }
    return NullSuccess();
}
