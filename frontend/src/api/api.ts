import { fakedata_getCompletionCategories, fakedata_getCompletions, fakedata_updateGameCompletionBuiltin } from "@/fakedata/completion";
import { fakedata_getGame, fakedata_getGameList } from "@/fakedata/games";
import { GameCompletion, GameCompletionCategory } from "@/types/completion";
import { Game, GameListFilter, GameListSearch, GameListSort } from "@/types/games";
import { Fail, Result, Success } from "@/types/result";

export const getGameList = async (sort: GameListSort, filter: GameListFilter, search: GameListSearch): Promise<Result<Game[], undefined>> => {
    return Success(await fakedata_getGameList(sort, filter, search));
}

export const getGame = async(identifier: string): Promise<Result<Game, undefined>> => {
    return Success(await fakedata_getGame(identifier));
}

export const getGameCompletions = async (username: string, sort: GameListSort, filter: GameListFilter, search: GameListSearch): Promise<Result<GameCompletion[], undefined>> => {
    return Success(await fakedata_getCompletions(username, sort, filter, search));
}

export const getGameCompletionCategories = async (username: string): Promise<Result<GameCompletionCategory[], undefined>> => {
    return Success(await fakedata_getCompletionCategories(username));
}

export const updateGameCompletionBuiltin = async (username: string, game: string, completionCategory: GameCompletion["status"]) => {
    return Success(await fakedata_updateGameCompletionBuiltin(username, game, completionCategory));
}
