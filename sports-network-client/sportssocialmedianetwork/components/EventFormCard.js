import Card from "./Card";
import Avatar from "./Avatar";
import { useState } from "react";
import jwtDecode from "jwt-decode";
import { useRecoilState } from "recoil";
import { eventModalState } from "../atom/eventModalAtom";

export default function EventFormCard({ user }) {
    const [open, setOpen] = useRecoilState(eventModalState);
    const [decode, setDecode] = useState("");
    if (user && decode === "") setDecode(jwtDecode(user.jwtToken));

    return (
        <Card>
            <div className="flex gap-2">
                <div>
                    <Avatar />
                </div>
                {decode && (
                    <input
                        disabled
                        className="grow p-3 h-14"
                        placeholder={"Create or search for an event"}
                    />
                )}
            </div>
            <div className="flex gap-5 items-center mt-2">
                <div className="grow text-left">
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
