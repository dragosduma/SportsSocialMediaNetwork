import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import PostFormCard from "../components/PostFormCard";
import { useState, useEffect } from "react";
import authService from "../services/auth-service";
import postService from "../services/post-service";
import UploadModal from "../components/UploadModal";

export default function Home() {

  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = authService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
    else {
      authService.logout();
    }

    fetchPosts();
  }, []);

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
    <Layout>
      <PostFormCard user={currentUser} />
      {posts?.length > 0 &&
        orderDescending.map((posts) => (
          <PostCard
            key={posts.id}
            id={posts.id}
            username={posts.userEmail}
            img={posts.image}
            caption={posts.caption}
            createdAt={posts.createdAt}
            user={currentUser}
          />
        ))}

      <UploadModal onPost={fetchPosts}></UploadModal>
    </Layout>
  );
}
