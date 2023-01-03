import { useRecoilState } from "recoil"
import { postModalState } from "../atom/postModalAtom"
import Modal from "react-modal"
import authHeader from "../services/auth-header";
import axios from "axios";
import { useState } from "react";
import { updatePostModalState } from "../atom/updatePostModalAtom";

export default function PostsModal({ postId }) {

    const [open, setOpen] = useRecoilState(postModalState); // initial modal with post options
    const [openUpdate, setOpenUpdate] = useRecoilState(updatePostModalState);
    const [refreshMessage, setRefreshMessage] = useState(false);
    const [caption, setCaption] = useState("");

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

    const bringUpdateModal = (event) => {
        event.preventDefault();
        setOpenUpdate(true)
        setOpen(false)
    }

    const handleUpload = async (event) => {
        event.preventDefault();
        return axios
            .put(`userposts/${postId}`,
                {
                 caption: caption   
                },
                {
                    headers: authHeader()
                }).then(response => {
                    console.log(response)
                    setOpenUpdate(false);
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
                            onClick={bringUpdateModal}
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

            {openUpdate && (
                <Modal
                    className="max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md"
                    isOpen={openUpdate}
                    onRequestClose={() => {
                        setOpenUpdate(false);
                    }}
                    ariaHideApp={false}
                >
                    <form onSubmit={handleUpload} className="flex flex-col justify-center items-center h-[100%] space-y-2">
                        <input
                            type="text"
                            maxLength="150"
                            placeholder="Please enter your description..."
                            className="m-4 border-none text-center w-full focus:ring-0"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                        />
                        <button
                            type='submit'
                            className="w-1/2 bg-red-600 text-white p-2 shadow-md hover:brightness-125 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100">
                            Update Post
                        </button>
                    </form>
                </Modal>
            )}
        </div>
    )
}
