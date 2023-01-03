import authService from "../services/auth-service"
import jwtDecode from "jwt-decode"
import { useState } from "react"

export default function MiniProfile({ user }) {

    const [decode, setDecode] = useState("")

    if (user && decode === "")
        setDecode(jwtDecode(user.jwtToken))

    return (
        <div className="flex items-center justify-between mt-14 ml-10">
            <img className="h-16 rounded-full border p-[2px]" src="/placeholder.jpg" alt="user-image" />
            <div className="flex-1 ml-4">
                {decode && <h2 className="font-bold">{decode.sub.split("@")[0]}</h2>}
                <h3 className="text-sm text-gray-400">Welcome to ssmn</h3>
            </div>
            <button className="font-semibold text-blue-400 text-sm" onClick={authService.logout}>Sign out</button>
        </div>
    )
}
