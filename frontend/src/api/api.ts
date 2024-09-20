import { fakedata_getGameAcheivements, fakedata_getUserAcheivements, fakedata_updateUserAchievementState } from "@/fakedata/achievements";
import { fakedata_getCompletion, fakedata_getCompletionCategories, fakedata_getCompletions, fakedata_updateGameCompletionBuiltin, fakedata_updateGameCompletionCategoryColour, fakedata_updateGameCompletionCategoryName, fakedata_updateGameCompletionCustom } from "@/fakedata/completion";
import { fakedata_getGameReview, fakedata_setGameReviewRating, fakedata_setGameReviewText } from "@/fakedata/review";
import { fakedata_getUserTimelineEntries } from "@/fakedata/timeline";
import { fakedata_getUser, fakedata_getUserScore } from "@/fakedata/users";
import { Achievement } from "@/types/achievements";
import { GameCompletion, GameCompletionCategory } from "@/types/completion";
import { Game, GameListFilter, GameListSearch, GameListSort } from "@/types/games";
import { Fail, MakeResultFromNull, Result, Success } from "@/types/result";
import { GameReview } from "@/types/review";

export const getGameList = async (_sort: GameListSort, _filter: GameListFilter, _search: GameListSearch): Promise<Result<Game[], Error>> => {
    const response = await fetch("http://localhost:4567/getGameList");
    if(response.status != 200) {
        return Fail(Error(`Failed to fetch game list with status code ${response.status}: ${response.statusText}`));
    }
    const data = (await response.json()) as Game[];
    return Success(data);
}

export const getGame = async(identifier: string): Promise<Result<Game, Error>> => {
    const response = await fetch(`http://localhost:4567/getGame?game=${encodeURIComponent(identifier)}`);
    if(response.status != 200) {
        return Fail(Error(`Failed to fetch game ${identifier} with status code ${response.status}: ${response.statusText}`));
    }
    const data = (await response.json()) as Game;
    return Success(data);
}

export const getGameCompletions = async (username: string, sort: GameListSort, filter: GameListFilter, search: GameListSearch): Promise<Result<GameCompletion[], undefined>> => {
    return Success(await fakedata_getCompletions(username, sort, filter, search));
}

export const getGameCompletion = async (username: string, game: string): Promise<Result<GameCompletion, Error>> => {
    const response = await fetch(`http://localhost:4567/getGameCompletion?username=${encodeURIComponent(username)}&game=${encodeURIComponent(game)}`);
    if(response.status != 200) {
        return Fail(Error(`Failed to fetch game ${game} completion for user ${username} with status code ${response.status}: ${response.statusText}`));
    }
    const data = (await response.json()) as GameCompletion;
    return Success(data);
}

export const getGameCompletionCategories = async (username: string): Promise<Result<GameCompletionCategory[], undefined>> => {
    return Success(await fakedata_getCompletionCategories(username));
}

export const updateGameCompletionCategoryName = async (username: string, oldName: string, newName: string) => {
    return Fail(await fakedata_updateGameCompletionCategoryName(username, oldName, newName));
}

export const updateGameCompletionCategoryColour = async (username: string, name: string, colour: string) => {
    return Fail(await fakedata_updateGameCompletionCategoryColour(username, name, colour));
}

export const updateGameCompletionBuiltin = async (username: string, game: string, completionCategory: GameCompletion["status"]) => {
    return Fail(await fakedata_updateGameCompletionBuiltin(username, game, completionCategory));
}

export const updateGameCompletionCustom = async (username: string, game: string, completionCategory: string) => {
    return Fail(await fakedata_updateGameCompletionCustom(username, game, completionCategory));
}

export const getGameAchievements = async (game: string) => {
    const achievements = await fakedata_getGameAcheivements(game);
    return MakeResultFromNull(achievements, "This game does not have achievements!");
}

export const getUser = async (username: string) => {
    const user = await fakedata_getUser(username);

    return MakeResultFromNull(user, "No such user");
}

export const getUserScore = async (username: string) => {
    const score = await fakedata_getUserScore(username);

    return Success(score);
}

export const getUserAchievements = async (user: string, game: string): Promise<Result<Achievement[], Error>> => {
    const userAchievements = await fakedata_getUserAcheivements(user, game)

    return MakeResultFromNull(userAchievements, "This user does not have achievements for this game!");
}

export const updateUserAchievementState = async (user: string, achievement: number, unlocked: boolean) => {
    return Fail(fakedata_updateUserAchievementState(user, achievement, unlocked));
}

export const getUserTimelineEntries = async (user: string) => {
    const entries = await fakedata_getUserTimelineEntries(user);
    return MakeResultFromNull(entries, "No such timeline entries");
}

export const getGameReview = async(user: string, game: string): Promise<Result<GameReview, Error>> => {
    return Success(await fakedata_getGameReview(game, user));
}

export const setGameReviewText = async(user: string, game: string, text: string): Promise<Result<undefined, void>> => {
    return Fail(await fakedata_setGameReviewText(game, user, text));
}

export const setGameReviewRating = async(user: string, game: string, rating: number): Promise<Result<undefined, void>> => {
    return Fail(await fakedata_setGameReviewRating(game, user, rating));
}
