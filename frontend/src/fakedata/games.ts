import { Game, GameListFilter, GameListSearch, GameListSort } from "@/types/games";


export const fakedata_getGameList = async (sort: GameListSort, filter: GameListFilter, search: GameListSearch) => {
    const filterGames = (game: Game) => {
        if(filter.release) {
            if(game.releaseYear < filter.release.from) return false;
            if(game.releaseYear > filter.release.to) return false;
        }
        if(filter.hasAchievements) {
            // TODO
        }
        return true;
    }

    const sortGames = (a: Game, b: Game) => {
        switch(sort.by) {
            case 'name':
                if(sort.acending) return a.name.localeCompare(b.name);
                return a.name.localeCompare(b.name);
            case 'release':
                if(sort.acending) return a.releaseYear - b.releaseYear;
                return b.releaseYear - a.releaseYear;
            default:
                throw new Error("Sort method not implemented.");
        }
    }

    const result = await fetch("/games.json");
    const games = (await result.json()) as Game[];

    const gameList = games
        .filter(game => search ? game.name.includes(search) : true)
        .filter(filterGames)
        .toSorted(sortGames);

    return gameList;
}

export const fakedata_getGame = async (identifier: string) => {
    const result = await fetch("/games.json");
    const games = (await result.json()) as Game[];

    return games.filter(game => game.identifier === identifier)[0];
}
