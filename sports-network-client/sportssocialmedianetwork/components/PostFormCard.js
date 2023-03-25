import Card from "./Card";
import Avatar from "./Avatar";
import { useState } from "react";
import jwtDecode from "jwt-decode";
import { useRecoilState } from "recoil";
import { uploadModalState } from "../atom/uploadModalAtom";

export default function PostFormCard({ user, onPost }) {
  const [open, setOpen] = useRecoilState(uploadModalState);
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
            placeholder={`What's on your mind, ${decode.sub.split("@")[0]}?`}
          />
        )}
      </div>
      <div className="flex gap-5 items-center mt-2">
        <div className="grow text-right">
          <button
            onClick={() => setOpen(true)}
            className="bg-socialBlue text-white px-6 py-1 rounded-md"
          >
            Upload
          </button>
        </div>
      </div>
    </Card>
  );
}
