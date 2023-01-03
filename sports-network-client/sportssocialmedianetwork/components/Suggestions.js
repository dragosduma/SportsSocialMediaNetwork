import { useEffect, useState } from "react";
import Router from 'next/router';
import authService from "../services/auth-service";
import userService from "../services/user-service";

export default function Suggestions() {
    const [suggestions, setSuggestions] = useState([]);
    useEffect(() => {
        userService.getAllUsers().then(
            (response) => {
                setSuggestions(response.data);
            },
            (error) => {
                console.log("Private info", error.response);
                if (error.response && error.response.data === 403) {
                    authService.logout();
                    Router.push("login")
                }
            }
        )
    }, []);

    return (
        <div className="mt-4 ml-10">
            <div className="flex justify-between mb-5 text-sm">
                <h3 className="font-bold text-gray-400">Suggested for you</h3>
                <button className="text-gray-600 font-semibold">See all</button>
            </div>
            {suggestions.map((suggestion) => (
                <div
                    key={suggestion.id}
                    className="flex items-center justify-between mt-3"
                >
                    <img
                        className="h-10 rounded-full border p-[2px]"
                        src={`https://i.pravatar.cc/150?img=${Math.ceil(
                            Math.random() * 70
                        )}`}
                        alt=""
                    />
                    <div className="flex-1 ml-4">
                        <h2 className="font-semibold text-sm">{suggestion.firstName} {suggestion.lastName}</h2>
                        <h3 className="text-sm text-gray-400 truncate w-[230px]">
                            {suggestion.email}
                        </h3>
                    </div>
                    <button className="font-semibold text-blue-400 text-sm">
                        Follow
                    </button>
                </div>
            ))}
        </div>
    );
}