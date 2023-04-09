import Card from "./Card";
import Avatar from "./Avatar";
import { useRecoilState } from "recoil";
import { uploadModalState } from "../atom/uploadModalAtom";

export default function PostFormCard({ currentUser }) {
  const [open, setOpen] = useRecoilState(uploadModalState);

  return (
    <Card>
      <div className="flex gap-2">
        <div>
          <Avatar />
        </div>
        {currentUser && (
          <input
            disabled
            className="grow p-3 h-14"
            placeholder={`What's on your mind, ${currentUser.sub.split("@")[0]}?`}
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
