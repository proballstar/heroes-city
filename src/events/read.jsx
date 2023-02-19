import React from "react";
import {
    MapPinIcon,
    CheckBadgeIcon,
    UserGroupIcon,
    HeartIcon
} from "@heroicons/react/24/outline";
import Nav from "../layout/Nav";
import { useNavigate } from "react-router-dom";

function View() {

    const [events, setEvents] = React.useState([])
    const navigate = useNavigate();

    function getItems() {
        fetch(`https://Hero-City-Backend.epiccodewizard2.repl.co/events`)
            .then(res => res.json())
            .then(r => setEvents(r))
    }

    React.useEffect(
        () => {
            getItems()
        },
        []    
    )

    return (
        <div className="grid grid-rows-1 grid-col-2 row-gap-4 overflow-hidden">
            <div className="spacing-large">
                {events.length > 0 && events?.map(({ date, description, eid, joins, likes, links, location, time, title }, i) => {
                    return (
                        <div
                            className="break-words text-left w-11/12 
              overflow-ellipsis shadow-lg m-3 p-3 border-2 border-green-400 rounded-lg"
                            onClick={async () => await navigate(`/events/spec/${eid}`)}
                        >
                            <p className="p-2 font-black text-2xl capitalize">
                                <div className="flex">
                                    <CheckBadgeIcon width={30} className="p-1" />
                                    <p>{title}</p>
                                </div>
                            </p>
                            <p className="p-2 font-bold text-lg">{description}</p>
                            <p className="p-2 font-semibold flex">
                                <MapPinIcon width={30} className="p-1" />
                                {location}
                            </p>
                            <p className="p-2 font-semibold flex">
                                <UserGroupIcon width={30} className="p-1" />
                                Attendees: {joins.length}
                            </p>
                            <p className="p-2 font-semibold flex">
                                <HeartIcon width={30} className="p-1" />
                                Likes: {likes.length}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Nav(View);