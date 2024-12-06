export type Session = null | {
    username: string,
    token: string,
    type: 'player' | 'developer',
};
