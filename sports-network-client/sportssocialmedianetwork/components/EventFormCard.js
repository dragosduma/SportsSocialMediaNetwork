import Card from "./Card";
import Avatar from "./Avatar";
import { useState } from "react";
import jwtDecode from "jwt-decode";
import { useRecoilState } from "recoil";
import { eventModalState } from "../atom/eventModalAtom";

export default function EventFormCard({ user, events, onSearch }) {
    const [open, setOpen] = useRecoilState(eventModalState);
    const [decode, setDecode] = useState("");
    if (user && decode === "") setDecode(jwtDecode(user.jwtToken));

    const [searchQuery, setSearchQuery] = useState("");

    function handleInputChange(event) {
        setSearchQuery(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        onSearch(searchQuery);
    }

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <div className="flex gap-2">
                    <div>
                        <Avatar />
                    </div>

                    <input
                        onChange={handleInputChange}
                        className="grow p-3 h-14"
                        placeholder={"Create or browse for an event by name"}
                        value={searchQuery}
                    />
                </div>
            </form>
            <div className="flex gap-5 items-center mt-2">
                <div className="grow text-left">
                    <button
                        className="bg-socialBlue text-white px-6 py-1 rounded-md mr-2"
                        type="submit"
                    >
                        Search
                    </button>
                    <button
                        onClick={() => setOpen(true)}
                        className="bg-socialBlue text-white px-6 py-1 rounded-md mr-2"
                    >
                        New Event
                    </button>
                </div>
            </div>

        </Card>
    )
}
