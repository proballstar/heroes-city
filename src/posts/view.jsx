import React from "react";
import Nav from "../layout/Nav";
import { useNavigate } from "react-router-dom";
import { EyeIcon, BookOpenIcon } from '@heroicons/react/24/outline'

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
                    <div className="break-words text-left w-11/12 
                    overflow-ellipsis shadow-lg m-3 p-3 border-2 border-green-400 rounded-lg" onClick={async () => await navigate(`/posts/spec/${post.pid}`)}>
                        <h1>{post.title} by {post.author_name}</h1>
                        <p className="p-2 font-semibold flex">
                                <EyeIcon width={30} className="p-1" />
                                Views: {post.views}
                            </p>
                            <p className="p-2 font-semibold flex">
                                <BookOpenIcon width={30} className="p-1" />
                                Read Time: {post.read_time}
                            </p>
                    </div>
                )
            })}            
        </div>
    );
}

export default Nav(ViewPosts);