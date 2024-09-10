export type Game = {
    identifier: string,
    name: string,
    releaseYear: number,
    developer: string,
    publisher: string,
    description: string,
}


export type GameListSort = {
    by: 'name' | 'release'
    acending: boolean
};
export type GameListFilter = {
    release?: {
        from: number,
        to: number
    },
    hasAchievements?: boolean,
};
export type GameListSearch = string | undefined

