import { useEffect, useState } from "react";
import axios from 'axios';

export default function Suggestions() {
    const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlbWFpbDFAZXhhbXBsZS5jb20iLCJpYXQiOjE2NjkxNTI2NjEsImV4cCI6MTY2OTE3MDY2MX0.FQoXfQRUOJao1NeUxA8aymVk8PsW2KlNvBZqBRLmKgE4g7wF4vabGNJhkyVN2qfH2V4fEbTI-RHd-wFUW4UFRA";

    const [suggestions, setSuggestions] = useState([]);
    const getSuggestions = async () => {
        const { data } = await axios.get('/users',
            {
                headers:
                {
                    "Authorization": `Bearer ${token}`
                }
            });
        setSuggestions(data);
    };

    useEffect(() => {
        getSuggestions();
    }, []);

    return (
        <div className="mt-4 ml-10">
            <div className="flex justify-between mb-5 text-sm">
                <h3 className="font-bold text-gray-400">Suggestion for you</h3>
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
                            {suggestion.phoneNumber}
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