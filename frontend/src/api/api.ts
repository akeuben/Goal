import { games } from "@/fakedata/games";
import { Game } from "@/types/games";
import { Result, Success } from "@/types/result";

export const getGameList = (): Result<Game[], undefined> => {
    const gameList = structuredClone(games); // Structured clone here to keep testing data constant

    return Success(gameList);
}
