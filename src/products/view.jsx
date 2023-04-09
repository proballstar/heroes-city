import React from "react";
import Nav from "../layout/Nav";
import { useNavigate } from "react-router-dom";
import { EyeIcon, BookOpenIcon } from '@heroicons/react/24/outline'

function ViewPosts() {

    const [posts, setPosts] = React.useState([]);
    const navigate = useNavigate();
    


    React.useEffect(() => {
        fetch(`/products/list/`)
            .then(res => res.json())
            .then(r => {
                r.append(0)
                setPosts(r)
            })

    }, [])

    return (
        <div>
            {posts.map((post, index) => {
                return (
                    <>
                        <div className="break-words text-left w-11/12 
                        overflow-ellipsis shadow-lg m-3 p-3 border-2 border-green-400 rounded-lg" onClick={async () => await navigate(`/producs/spec/${post.pid}`)}>
                            {post == 0 && (
                                <div>
                                    <PlusCircleIcon width={90} />
                                </div>
                            )}
                            {post != 0 && (
                                <div>
                                    
                                </div>
                            )}
                        </div>
                    </>
                )
            })}            
        </div>
    );
}

export default Nav(ViewPosts);