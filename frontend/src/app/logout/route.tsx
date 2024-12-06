import { endSession } from "@/api/api";
import { getUserSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export function GET() {
    endSession(getUserSession()?.username || "")
    cookies().delete("username");
    cookies().delete("token");
    cookies().delete("type");

    redirect("/");
}

