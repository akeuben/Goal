import { getUserSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default function Page() {
    const session = getUserSession();
    if(!session) redirect("/");
    if(session.type == "player") redirect("/dashboard/games");
    if(session.type == "developer") redirect("/dashboard/developer");
}
