import React from "react";
import Nav from "../layout/Nav";
import { useNavigate } from "react-router-dom";
import { EyeIcon, BookOpenIcon } from '@heroicons/react/24/outline'
import { useCookies } from "react-cookie";

function ViewPosts() {

    const [jobs, setJobs] = React.useState([]);
    const navigate = useNavigate();
    const [c, setC, delC] = useCookies(['cname'])


    React.useEffect(() => {
        let url = new URLSearchParams({cname: cname})
        fetch(`/job/list?${url}`)
            .then(res => res.json())
            .then(r => setJobs(r))

    }, [])

    return (
        <div>
            {jobs.map((j, index) => {
                return (
                    <div className="break-words text-left w-11/12 
                    overflow-ellipsis shadow-lg m-3 p-3 border-2 border-green-400 rounded-lg" onClick={async () => await navigate(`/posts/spec/${post.pid}`)}>
                        
                    </div>
                )
            })}            
        </div>
    );
}

export default Nav(ViewPosts);