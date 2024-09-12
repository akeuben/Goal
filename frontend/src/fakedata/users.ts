import { User } from "@/types/user";

export const fakedata_getUser = async (username: string) => {
    const result = await fetch("http://localhost:3000/users.json");
    const users = (await result.json()) as User[];

    return users.filter(user => user.username === username)[0];
}
