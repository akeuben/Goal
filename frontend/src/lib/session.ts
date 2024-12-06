import { Session } from "@/types/session";
import { eraseCookieClient, getCookie, setCookieClient } from "./cookie";

export const getUserSession = (): Session => {
    const username = getCookie("username");
    const token = getCookie("token");
    const type = getCookie("type") as 'player' | 'developer';

    if(!username || !token) return null;

    return {
        username: username,
        token: token,
        type: type,
    };
}

export const setSession = (session: Session) => {
    if(session) {
        setCookieClient("username", session.username, 1024);
        setCookieClient("token", session.token, 1024);
        setCookieClient("type", session.type, 1024);
    }
}
