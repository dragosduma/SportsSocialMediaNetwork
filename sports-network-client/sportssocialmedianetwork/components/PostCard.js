import Avatar from "./Avatar";
import Card from "./Card";
import ClickOutHandler from "react-clickout-handler";
import { useState, useEffect } from "react";
import Link from "next/link";
import ReactTimeAgo from "react-time-ago";
import { Button } from "react-bootstrap";
import axios from "axios";
import authHeader from "../services/auth-header";
import jwtDecode from "jwt-decode";

export default function PostCard({
  id,
  username,
  img,
  caption,
  createdAt,
  user,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  var splitUsername = "";
  if (username) splitUsername = username.split("@")[0];

  function openDropdown(e) {
    e.stopPropagation();
    setDropdownOpen(true);
  }

  function handleClickOutsideDropdown(e) {
    e.stopPropagation();
    setDropdownOpen(false);
  }

  const [comment, setComment] = useState({
    text: "",
    postId: id,
  });

  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  function fetchComments() {
    axios
      .get(`/postcomments?postId=${id}`, {
        headers: authHeader(),
      })
      .then((response) => {
        setComments(response.data);
      });
  }

  function updateComment(value) {
    const commentCopy = { ...comment };
    commentCopy.text = value;
    setComment(commentCopy);
  }

  function submitComment() {
    return axios
      .post("/postcomments", comment, {
        headers: authHeader(),
      })
      .then((response) => {
        fetchComments();
      });
  }

  const handleDelete = async (event) => {
    event.preventDefault();
    return axios
      .delete(`/userposts/${id}`, {
        headers: authHeader(),
      })
      .then((response) => {
        alert("Post deleted!");
      });
  };

  const [decode, setDecode] = useState("");
  if (user && decode === "") setDecode(jwtDecode(user.jwtToken));

  const [sameUser, setSameUser] = useState(true);
  if (decode && sameUser) if (decode.sub !== username) setSameUser(false);

  const numDescending = [...comments].sort((a, b) => a.id - b.id);

  return (
    <Card>
      <div className="flex gap-3">
        <div>
          <Link href={"/profile"}>
            <span className="cursor-pointer">
              <Avatar />
            </span>
          </Link>
        </div>
        <div className="grow">
          <p>
            <Link href={"/profile/"}>
              <span className="mr-1 font-semibold cursor-pointer hover:underline">
                {splitUsername}
              </span>
            </Link>
            shared a <a className="text-socialBlue">photo</a>
          </p>
          <p className="text-gray-500 text-sm">
            <ReactTimeAgo date={Date.parse(createdAt)} />
          </p>
        </div>
        <div className="relative">
          <button className="text-gray-400" onClick={openDropdown}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </button>
          {dropdownOpen && (
            <div className="bg-red w-5 h-5 absolute top-0"></div>
          )}
          <ClickOutHandler onClickOut={handleClickOutsideDropdown}>
            <div className="relative">
              {dropdownOpen && (
                <div className="absolute -right-6 bg-white shadow-md shadow-gray-300 p-3 rounded-sm border border-gray-100 w-52">
                  <button className="flex gap-3 py-2 my-2 w-52 hover:bg-socialBlue hover:text-white -mx-4 px-4 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                      />
                    </svg>
                    Save post
                  </button>
                  <button className="flex gap-3 py-2 my-2 w-52 hover:bg-socialBlue hover:text-white -mx-4 px-4 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
                      />
                    </svg>
                    Turn notifications
                  </button>
                  {/* <button className="flex gap-3 py-2 my-2 w-52 hover:bg-socialBlue hover:text-white -mx-4 px-4 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Hide post
                  </button> */}
                  {sameUser ? (
                    <button
                      onClick={handleDelete}
                      className="flex gap-3 py-2 my-2 w-52 hover:bg-socialBlue hover:text-white -mx-4 px-4 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                      Delete
                    </button>
                  ) : (
                    <button className="flex gap-3 py-2 my-2 w-52 hover:bg-socialBlue hover:text-white -mx-4 px-4 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                        />
                      </svg>
                      Report
                    </button>
                  )}
                </div>
              )}
            </div>
          </ClickOutHandler>
        </div>
      </div>
      <div>
        <p className="my-3 text-sm">{caption}</p>
        <div className="flex rounded-md overflow-hidden justify-center">
          <img className="" src={`data:image/jpeg;base64,${img}`} alt="" />
        </div>
      </div>
      <div className="mt-5 flex gap-8">
        <button className="flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
          72
        </button>
        <button className="flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
            />
          </svg>
          {comments.length}
        </button>
        <button className="flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
            />
          </svg>
          4
        </button>
      </div>
      <div className="flex mt-4 gap-3">
        <div>
          <Avatar />
        </div>
        <div className="border grow rounded-full relative">
          <form className="flex item-center">
            <input
              onChange={(event) => updateComment(event.target.value)}
              className="block border-none outline-none w-full p-3 px-4 overflow-hidden h-12 rounded-full"
              placeholder="Leave a comment"
            ></input>
            <Button
              onClick={() => submitComment()}
              disabled={!comment.text}
              className="text-blue-400 font-bold disabled:text-blue-200 py-3 px-3"
            >
              Post
            </Button>
          </form>
        </div>
      </div>
      {comments.length > 0 &&
        numDescending.map((comment) => (
          <div key={comment.id} className="h-22 overflow-hidden hover:overflow-y-scroll">
            <div key={comment.id} className="mt-2 flex gap-2 items-center">
              <Avatar />
              <div className="bg-gray-200 py-2 px-4 rounded-3xl">
                <div>
                  <Link href={"/profile/" + comment.userEmail.split("@")[0]}>
                    <span className="hover:underline font-semibold mr-1">
                      {comment.userEmail.split("@")[0]}
                    </span>
                  </Link>
                  <span className="text-sm text-gray-500">
                    {" "}
                    <ReactTimeAgo
                      timeStyle={"twitter"}
                      date={new Date(comment.createdAt).getTime()}
                    ></ReactTimeAgo>
                  </span>
                </div>
                <p className="text-sm">{comment.text}</p>
              </div>
            </div>
          </div>
        ))}
    </Card>
  );
}
