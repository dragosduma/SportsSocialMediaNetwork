export default function authHeader() {
    const ISSERVER = typeof window === "undefined";
    if (!ISSERVER)
        var token = JSON.parse(localStorage.getItem("user")).jwtToken

    if (token) {
        return { "Authorization": `Bearer ${token}` }
    } else {
        return {};
    }
}