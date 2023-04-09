import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import PostFormCard from "../components/PostFormCard";
import { useState, useEffect } from "react";
import authService from "../services/auth-service";
import postService from "../services/post-service";
import UploadModal from "../components/UploadModal";
import jwtDecode from "jwt-decode";
import { io } from "socket.io-client";

export default function Home() {

  const [currentUser, setCurrentUser] = useState(undefined);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const user = authService.getCurrentUser();

    if (user) {
      setCurrentUser(jwtDecode(user.jwtToken));
    }
    else {
      authService.logout();
    }

    const socketOptions = {
      reconnection: false // disable automatic reconnection
    };
    
    setSocket(io("http://localhost:5000", socketOptions));
    fetchPosts();
  }, []);

  useEffect(() => {
    socket?.emit("newUser", currentUser);
  }, [socket, currentUser]);

  const [posts, setPosts] = useState([]);

  const orderDescending = [...posts].sort((a, b) => b.id - a.id);

  function fetchPosts() {
    postService.getAllPosts().then(
      (response) => {
        setPosts(response.data);
      },
      (error) => {
        console.log(error)
      }
    );
  }

  return (
    <Layout socket={socket}>
      <PostFormCard currentUser={currentUser} />
      {posts?.length > 0 &&
        orderDescending.map((posts) => (
          <PostCard
            key={posts.id}
            id={posts.id}
            username={posts.userEmail}
            img={posts.image}
            caption={posts.caption}
            createdAt={posts.createdAt}
            currentUser={currentUser}
            socket={socket}
          />
        ))}

      <UploadModal onPost={fetchPosts}></UploadModal>
    </Layout>
  );
}
