import React from "react";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import Nav from "../../layout/Nav";
import { MapPinIcon, 
    CalendarDaysIcon, 
    LinkIcon, 
    UserIcon, 
    HeartIcon,
    PaperAirplaneIcon 
} from '@heroicons/react/24/outline'

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
           <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              {details.title}
            </h1>
            <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                <div dangerouslySetInnerHTML={{__html: details.description}} />
            </p>
            <div className="p-2 font-semibold flex">
                  <CalendarDaysIcon width={30} className="p-1" />
                  When: {details.date} {" @ "} {details.time}
            </div>
            <div className="p-2 font-semibold flex">
                  <MapPinIcon width={30} className="p-1" />
                  Address: {" "} {JSON.stringify(details.location)}
            </div>
            {Array.isArray(details.links) && details.links.map((lin, idx) => {
                return (
                    <div>
                        <a className="p-2 font-semibold flex" href={lin}>
                            <LinkIcon width={30} className="p-1" />
                            To: {" "} Link {idx+1}                       
                        </a>
                    </div>
                )
            })}

            {Array.isArray(details.joins) && details.joins.map((j, idx) => {
                return (
                    <div className="p-2 font-semibold flex">
                        <UserIcon width={30} className="p-1" />
                        {" "} {JSON.stringify(details.j.dn)}
                    </div>
                )
            })}
            <button className="p-2 font-semibold flex" onClick={async () => await handleLike()}>
                  <HeartIcon width={30} className="p-1" />
                  Like: {" "} {JSON.stringify(details.lc)}
            </button>
            <button className="p-2 font-semibold flex" onClick={async () => await handleJoin()}>
                  <PaperAirplaneIcon width={30} className="p-1" />
                  Join this event
            </button>
        </div>
    )
}

export default Nav(SpecificEvent)