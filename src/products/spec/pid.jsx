import React from "react";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import Nav from "../../layout/Nav";
import { HeartIcon, EyeIcon, BookOpenIcon } from '@heroicons/react/24/outline'

function SpecificEvent() {
    
    const [details, setDetails] = React.useState({});
    const [cContent,, setCContent] = React.useState("");
    const { pid } = useParams();


    React.useEffect(() => {
        fetch(`/products/${pid}`)
            .then(res => res.json())
            .then(data => {
                const tempData = data;
                setDetails(tempData);
            })
        }, [pid])
        
    
    return (
        <div>
            <img src={details.image} alt={details.title} />
            <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              {details.title}
            </h1>
            <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
              Written by {details.author_name}
            </p>

            <div dangerouslySetInnerHTML={{__html: details.content}} />
            <div className="p-2 font-semibold flex">
                  <BookOpenIcon width={30} className="p-1" />
                  Read Time: {" "} {JSON.stringify(details.read_time)}
            </div>
            <div className="p-2 font-semibold flex" onClick={async () => await handleLike()}>
                  <EyeIcon width={30} className="p-1" />
                  Views: {" "} {JSON.stringify(details.views)}
            </div>
            <button className="p-2 font-semibold flex" onClick={async () => await handleLike()}>
                  <HeartIcon width={30} className="p-1" />
                  Like: {" "} {JSON.stringify(details.likes)}
            </button>
            <div>
          {Array.isArray(details.comments) && details.comments.map((values, index) => {
            return (
              <div key={`comment-${index}`} className='p-3 rounded-lg shadow-md'>
                <h1>
                  By User: {values.uid}
                </h1>
                <br></br>
                <div>
                  {values.content}
                </div>
              </div>
            )
          })}
        </div>
        <div>
        <br></br>
          <input
            placeholder='Write your comment'
            value={cContent}
            onChange={e => setCContent(e.target.value)}
          />

          <button onClick={comment}>
            Submit your comment
          </button>

        </div>
      </div>
    )
}

export default Nav(SpecificEvent)