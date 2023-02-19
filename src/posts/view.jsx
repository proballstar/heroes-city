import React from "react";
import Nav from "../layout/Nav";
import { useNavigate } from "react-router-dom";

function ViewPosts() {

    const [posts, setPosts] = React.useState([]);
    const navigate = useNavigate();
    


    React.useEffect(() => {
        fetch(`https://Hero-City-Backend.epiccodewizard2.repl.co/posts/list`)
            .then(res => res.json())
            .then(r => setPosts(r))

    }, [])

    return (
        <div>
            {posts.map((post, index) => {
                return (
                    <div onClick={async () => await navigate(`/posts/spec/${post.pid}`)}>
                        <img src={post.image} alt={post.title} />
                        <h1>{post.title} by {post.author}</h1>
                        <h3>Views: {Array.isArray(post.likes) && post.likes.length}</h3>
                        <h3>Estimated Time to Read: {post.read_time}</h3>
                    </div>
                )
            })}            
        </div>
    );
}

export default Nav(ViewPosts);