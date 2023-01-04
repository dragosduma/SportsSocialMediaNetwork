import { DotsHorizontalIcon, HeartIcon, ChatIcon, BookmarkIcon, EmojiHappyIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import { useRecoilState } from "recoil";
import { Button } from "react-bootstrap"
import authHeader from '../services/auth-header';
import axios from "axios";
import Moment from 'react-moment';
import 'moment-timezone';
import PostsModal from './PostsModal';
import { postModalState } from "../atom/postModalAtom";
import authService from '../services/auth-service';
import jwtDecode from 'jwt-decode';

export default function Post({ img, userImg, caption, username, id }) {

    const [open, setOpen] = useRecoilState(postModalState);

    const [currentUser, setCurrentUser] = useState(undefined);

    const [comment, setComment] = useState({
        text: "",
        postId: id,
    });

    const [comments, setComments] = useState([])

    const [decode, setDecode] = useState("")

    const [sameUser, setSameUser] = useState(true)

    const numDescending = [...comments].sort((a, b) => a.id - b.id);

    useEffect(() => {
        const user = authService.getCurrentUser();

        if(user) {
            setCurrentUser(user)
        }

        axios.get(`/postcomments?postId=${id}`,
            {
                headers: authHeader()
            }).then(response => {
                setComments(response.data)
            })
    }, [])

    function updateComment(value) {
        const commentCopy = { ...comment }
        commentCopy.text = value;
        setComment(commentCopy);
    }

    function submitComment() {
        return axios
            .post("/postcomments",
                comment,
                {
                    headers: authHeader()
                }).then(response => {
                    console.log(response)
                })
    }

    if (currentUser && decode === "")
    {
        setDecode(jwtDecode(currentUser.jwtToken))
    }

    if(decode && sameUser)
        if(decode.sub !== username)
            setSameUser(false)

    return (
        <div className='bg-white my-7 border rounded-md'>
            {/*post header*/}
            <div className="flex items-center p-5">
                {/* <img className='h-12 rounded-full object-cover border p-1 mr-3' src={userImg} /> */}
                <p className='font-bold flex-1'>{username.split("@")[0]}</p>
                {sameUser && <DotsHorizontalIcon
                    className='btn'
                    onClick={() => setOpen(true)}
                />}
            </div>

            {/*post image */}
            <img className="object-cover w-full" src={`data:image/jpeg;base64,${img}`} alt="" />
            
            {/*post buttons */}
            <div className="flex justify-between px-4 pt-4">
                <div className="flex space-x-4">
                    <HeartIcon className='btn' />
                    <ChatIcon className='btn' />
                </div>
                <BookmarkIcon className='btn' />
            </div>

            {/*post comments */}
            <p className='p-5 truncate'>
                <span className='font-bold mr-2'></span>
                {caption}
            </p>
            
            {/* <Comments/> */}
            {comments.length > 0 && (
                <div className="mx-10 max-h-24 overflow-y-scroll scrollbar-none">
                    {numDescending.map(comment => (
                        <div className="flex items-center space-x-2 mb-2" key={comment.id}>
                            <p className="font-semibold">{comment.userEmail.split("@")[0]}</p>
                            <p className="flex-1 truncate">{comment.text}</p>
                            <Moment fromNow>{comment.createdAt}</Moment>
                        </div>
                    ))}
                </div>
            )}

            {/*post input box */}
            <form className="flex item-center p-4">
                <EmojiHappyIcon className='h-7' />
                <textarea
                    onChange={(event) => updateComment(event.target.value)}
                    className="border-none flex-1 focus:ring-0"
                    type="text"
                    placeholder='Enter your comment...'
                ></textarea>
                <Button
                    onClick={() => submitComment()}
                    disabled={!comment.text.trim()}
                    className='text-blue-400 font-bold disabled:text-blue-200'
                >
                    Post
                </Button>
            </form>
            <PostsModal postId={id}></PostsModal>
        </div>
    );
}
