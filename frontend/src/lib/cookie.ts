// https://stackoverflow.com/questions/10730362/get-cookie-by-name
function getCookieClient(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
}

export function getCookie(name: string) {
    if(typeof document === "undefined") {
        return require("next/headers").cookies().get(name)?.value || null;
    } else {
        return getCookieClient(name) || null;
    }
}

// https://stackoverflow.com/questions/14573223/set-cookie-and-get-cookie-with-javascript
export function setCookieClient(name: string, value: string, days: number) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
