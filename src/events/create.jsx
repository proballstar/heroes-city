import React from "react";
import Forms from "./form.jsx";
import {  PlusCircleIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import Nav from "../layout/Nav.jsx";

function WorkContainer() {
    const [title, setTitle] = React.useState("");
    const [desc, setDesc] = React.useState("");
    const [addr, setAddr] = React.useState("")
    const [submitted, setSubmitted] = React.useState(false);
    const [links, setLinks] = React.useState("");


    const handleSubmit = () => {
        const date = new Date();

        let time = `${date.getHours()}:${date.getMinutes()}`
        let _date = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

        setSubmitted(true);
        fetch(`https://Hero-City-Backend.epiccodewizard2.repl.co/events/create`, {
            body: JSON.stringify({
                "date": _date,
                "time": time,
                "title": title,
                "desc": desc,
                "loc": addr,
                "links": links
            }),
            headers: new Headers({"Content-Type": "application/json"}),
            method: 'POST'
        })
        setTimeout(() => setSubmitted(false), 2 * 1000);
    };

    return (
        <div
            className="flex h-screen w-screen"
        >
            <div className="center w-screen" style={{"justifyContent": "center", "flex": 1}}>
                <div className="p-6 m-2 marginadding">
                    <p className="text-4xl font-bold m-3">Post an Event or Violation</p>
                    <Forms title="Title" type="text" value={title} change={setTitle} />
                    <Forms
                        title="Description"
                        type="text"
                        value={desc}
                        change={setDesc}
                    />
                    <Forms title="Address" type="text" value={addr} change={setAddr} />
                    <Forms title="Links (seperate with space)" type="text" value={links} change={setLinks} />
                    <button
                        className="outline-none animate-bounce p-2 border-2 border-green-900 font-semibold text-green-800 rounded-lg m-2 outline-none"
                        onClick={handleSubmit}
                    >
                        <div className="flex">
                            {submitted ? (
                                <div>
                                    {/* <svg width="100" height="100" className="animate-spin">
                  <path d="M0,50 a1,1 0 0,0 50,0" fill="green" />
                </svg> */}
                                    <ArrowPathIcon width={30} className="animate-spin" />
                                </div>
                            ) : (
                                <PlusCircleIcon width={30} />
                            )}{" "}
                            <p className="p-1">Add an Event</p>
                        </div>
                    </button>
                    {submitted && (
                        <div>
                            <p>You have created a post</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Nav(WorkContainer);
