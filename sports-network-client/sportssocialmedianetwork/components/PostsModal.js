import { useRecoilState } from "recoil"
import { postModalState } from "../atom/postModalAtom"
import Modal from "react-modal"
import authHeader from "../services/auth-header";
import axios from "axios";
import { useState } from "react";

export default function PostsModal({ postId }) {

    const [open, setOpen] = useRecoilState(postModalState);
    const [refreshMessage, setRefreshMessage] = useState(false);

    const handleDelete = async (event) => {
        event.preventDefault();
        return axios
            .delete(`/userposts/${postId}`,
                {
                    headers: authHeader()
                }).then(response => {
                    setRefreshMessage(true);
                    setOpen(false);
                })
    }

    return (
        <div>
            {open && (
                <Modal className="max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md"
                    isOpen={open}
                    onRequestClose={() => {
                        setOpen(false);
                    }}
                    ariaHideApp={false}
                >
                    <div className="flex flex-col justify-center items-center h-[100%] space-y-2">
                        <button className="w-1/2 bg-red-600 text-white p-2 shadow-md hover:brightness-125 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100"
                        //onClick={handleUpdate}
                        >
                            Update
                        </button>
                        <button className="w-1/2 bg-red-600 text-white p-2 shadow-md hover:brightness-125 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </div>
                </Modal>
            )}
            {refreshMessage && alert("Post deleted, please refresh page")}
        </div>
    )
}
