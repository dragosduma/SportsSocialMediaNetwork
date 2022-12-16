import Post from './Post';
import { useEffect, useState } from 'react';
import postService from '../services/post-service';

export default function Posts() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        postService.getAllPosts().then(
            (response) => {
                setPosts(response.data);
                console.log(response.data);
            },
            (error) => {
                console.log("Private info", error.response);
                if (error.response && error.response.data === 403) {
                    authService.logout();
                    Router.push("login")
                }
            }
        )
    }, []);

    return (
        <div>
            {posts.map(posts => (
                <Post
                    key={posts.id}
                    id={posts.id}
                    username={posts.username}
                    img={posts.image}
                    caption={posts.caption}
                />
            ))}
        </div>
    );
}
