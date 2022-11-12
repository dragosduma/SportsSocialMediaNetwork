import Post from './Post';

export default function Posts() {
    const posts = [
        {
            id: "1",
            username: "username",
            userImg: "/placeholder.jpg",
            img: "https://www.shutterstock.com/ro/image-illustration/photorealistic-3d-illustration-futuristic-city-style-2000612981",
            caption: "thanks"
        },
        {
            id: "2",
            username: "username2",
            userImg: "/placeholder.jpg",
            img: "https://www.shutterstock.com/ro/image-illustration/future-city-downtown-skyscrapers-neon-cyberpunk-1945617913",
            caption: "cool"
        }
    ];
    return (
        <div>
            {posts.map(post => (
                <Post
                    key={post.id}
                    id={post.id}
                    username={post.username}
                    userImg={post.userImg}
                    img={post.img}
                    caption={post.caption}
                />
            ))}
        </div>
    );
}
