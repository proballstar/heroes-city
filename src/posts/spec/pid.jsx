import React from "react";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import Nav from "../../layout/Nav";

function SpecificEvent() {
    
    const [details, setDetails] = React.useState({});
    const [cContent,, setCContent] = React.useState("");



    const { pid } = useParams();

    async function handleLike() {
        const auth = getAuth()
        fetch(`https://Hero-City-Backend.epiccodewizard2.repl.co/events/${pid}/like/${auth.currentUser.uid}`)
    }

    React.useEffect(() => {
        fetch(`https://Hero-City-Backend.epiccodewizard2.repl.co/posts/${pid}`)
            .then(res => res.json())
            .then(data => {
                const tempData = data;
                setDetails(tempData);
            })
        }, [pid])

        function comment() {
            let uid = getAuth().currentUser.uid;
            let body = JSON.stringify({
              pid,
              uid,
              content: cContent
            })
            let headers = new Headers()
            headers.append('Content-Type', 'application/json')
            fetch(`https://Hero-City-Backend.epiccodewizard2.repl.co/posts/comments/${pid}`,{
              headers,
              body,
              method: 'POST'
            })
          }
        
    
    return (
        <div>
            <img src={details.image} alt={details.title} />
            <h1>{details.title}</h1> by {details.author_name}

            <div dangerouslySetInnerHTML={{__html: details.content}} />
            <div>
                Details:
                <p>Read Time: {details.read_time} </p>
            </div>
            <div>
                Views: {details.views}
            </div>
            <div>
                Likes: {Array.isArray(details.likes) ? details.likes.length : 0}
            </div>
            <button onClick={async () => await handleLike()}>
                Like this event
            </button>
            <div>
          {details.comments.map((values, index) => {
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