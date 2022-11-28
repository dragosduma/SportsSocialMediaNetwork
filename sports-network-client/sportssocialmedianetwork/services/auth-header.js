import Router from "next/router"

export default function authHeader() {
    const ISSERVER = typeof window === "undefined";
    if (!ISSERVER) {
        var token = JSON.parse(localStorage.getItem("user"))
    }

    if (token) {
        var jwtToken = token.jwtToken
        return { "Authorization": `Bearer ${jwtToken}` }
    } else {
        Router.push("login");
    }
}