import { fakedata_getGameAcheivements, fakedata_getUserAcheivements, fakedata_updateUserAchievementState } from "@/fakedata/achievements";
import { fakedata_getCompletion, fakedata_getCompletionCategories, fakedata_getCompletions, fakedata_updateGameCompletionBuiltin, fakedata_updateGameCompletionCategoryColour, fakedata_updateGameCompletionCategoryName, fakedata_updateGameCompletionCustom } from "@/fakedata/completion";
import { fakedata_getGame, fakedata_getGameList } from "@/fakedata/games";
import { fakedata_getUser } from "@/fakedata/users";
import { Achievement } from "@/types/achievements";
import { GameCompletion, GameCompletionCategory } from "@/types/completion";
import { Game, GameListFilter, GameListSearch, GameListSort } from "@/types/games";
import { Fail, MakeResult, MakeResultFromNull, Result, Success } from "@/types/result";

export const getGameList = async (sort: GameListSort, filter: GameListFilter, search: GameListSearch): Promise<Result<Game[], undefined>> => {
    return Success(await fakedata_getGameList(sort, filter, search));
}

export const getGame = async(identifier: string) => {
    const game = await fakedata_getGame(identifier);

    return MakeResultFromNull(game, "No such game");
}

export const getGameCompletions = async (username: string, sort: GameListSort, filter: GameListFilter, search: GameListSearch): Promise<Result<GameCompletion[], undefined>> => {
    return Success(await fakedata_getCompletions(username, sort, filter, search));
}

export const getGameCompletion = async (username: string, game: string) => {
    const completion = await fakedata_getCompletion(username, game);

    console.log(completion);

    return MakeResultFromNull(completion, "No such user completion");
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

export const getUserAchievements = async (user: string, game: string): Promise<Result<Achievement[], Error>> => {
    const userAchievements = await fakedata_getUserAcheivements(user, game)

    return MakeResultFromNull(userAchievements, "This user does not have achievements for this game!");
}

export const updateUserAchievementState = async (user: string, achievement: number, unlocked: boolean) => {
    return Fail(fakedata_updateUserAchievementState(user, achievement, unlocked));
}
