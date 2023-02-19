import React from "react";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import Nav from "../../layout/Nav";

function SpecificEvent() {
    
    const [details, setDetails] = React.useState({});


    const { eid } = useParams();

    async function handleLike() {
        const auth = getAuth()
        fetch(`https://Hero-City-Backend.epiccodewizard2.repl.co/events/${eid}/like/${auth.currentUser.uid}`)
    }

    async function handleJoin() {
        const auth = getAuth()
        fetch(`https://Hero-City-Backend.epiccodewizard2.repl.co/events/${eid}/join/${auth.currentUser.uid}/${auth.currentUser.displayName}`)
    }

    React.useEffect(() => {
        fetch(`https://Hero-City-Backend.epiccodewizard2.repl.co/events/${eid}`)
            .then(res => res.json())
            .then(data => {
                const tempData = data;
                tempData["links"] = tempData["links"].split(" ")
                // tempData["likes"] = JSON.parse(tempData["likes"])
                // tempData["joins"] = JSON.parse(tempData["joins"])
                setDetails(tempData);
            })
        }, [eid])
    
    return (
        <div>
            <h1>{details.title}</h1>
            <div dangerouslySetInnerHTML={{__html: details.description}} />
            <div>
                Details:
                <p>{details.date} @ {details.time}</p>
                <p>{details.location}</p>
            </div>
            {Array.isArray(details.links) && details.links.map((lin, idx) => {
                return (
                    <div>
                        <a href={lin}>
                            Link {idx+1}
                        </a>
                    </div>
                )
            })}

            {Array.isArray(details.joins) && details.joins.map((j, idx) => {
                return (
                    <div>
                        {j.dn}
                    </div>
                )
            })}
            <button onClick={async () => await handleJoin()}>
                Join this event
            </button>
            <div>
                Likes: {details.lc}
            </div>
            <button onClick={async () => await handleLike()}>
                Like this event
            </button>
        </div>
    )
}

export default Nav(SpecificEvent)