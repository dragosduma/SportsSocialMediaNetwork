import { useRecoilState } from "recoil"
import { modalState } from "../atom/modalAtom"
import Modal from "react-modal"
import { CameraIcon } from "@heroicons/react/outline";
import { useRef, useState } from "react";
import axios from "axios";

export default function UploadModal() {
    const [open, setOpen] = useRecoilState(modalState);
    const [selectedFile, setSelectedFile] = useState(null);
    const [caption, setCaption] = useState("");

    // const getBase64StringFromDataURL = (dataURL) =>
    //     dataURL.replace('data:', '').replace(/^.+,/, '');

    const dataURLtoFile = (dataurl, filename) => {
        const arr = dataurl.split(',')
        const mime = arr[0].match(/:(.*?);/)[1]
        const bstr = atob(arr[1])
        let n = bstr.length
        const u8arr = new Uint8Array(n)
        while (n) {
            u8arr[n - 1] = bstr.charCodeAt(n - 1)
            n -= 1 // to make eslint happy
        }
        return new File([u8arr], filename, { type: mime })
    }

    const handleUpload = async (event) => {
        event.preventDefault();
        let formData = new FormData();
        const file = dataURLtoFile(selectedFile)
        formData.append("image", file);
        formData.append("caption", caption);
        var token = JSON.parse(localStorage.getItem("user")).jwtToken
        return axios
            .post("/userposts",
                formData,
                {
                    headers: {
                        'authorization': `Bearer ` + token,
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(response => {
                    console.log(response.data)
                    setOpen(false);
                })
    }

    function addImageToPost(event) {
        const reader = new FileReader();
        if (event.target.files[0]) {
            reader.readAsDataURL(event.target.files[0])
        }

        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result)
        }
    }

    const filePickerRef = useRef(null);

    return (
        <div>
            {open && (
                <Modal
                    className="max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md"
                    isOpen={open}
                    onRequestClose={() => {
                        setOpen(false);
                        setSelectedFile(null);
                    }}
                    ariaHideApp={false}
                >
                    <div className="flex flex-col justify-center items-center h-[100%]">
                        {selectedFile ? (
                            <img
                                onClick={() => setSelectedFile(null)}
                                src={selectedFile}
                                alt=""
                                className="max-h-[300px] object-cover cursor-pointer" />
                        ) : (
                            <CameraIcon
                                onClick={() => filePickerRef.current.click()}
                                className="cursor-pointer h-14 bg-red-200 p-2 rounded-full border-2 text-red-500"
                            />
                        )}
                        <form onSubmit={handleUpload} encType="multipart/form-data">
                            <input
                                type="file"
                                hidden
                                ref={filePickerRef}
                                onChange={addImageToPost}
                            />
                            <input
                                type="text"
                                maxLength="150"
                                placeholder="Please enter your description..."
                                className="m-4 border-none text-center w-full focus:ring-0"
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                            />
                            <button
                                disabled={!selectedFile}
                                type='submit'
                                className="w-full bg-red-600 text-white p-2 shadow-md hover:brightness-125 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100">
                                Upload Post
                            </button>
                        </form>
                    </div>
                </Modal>
            )}
        </div>
    )
}
