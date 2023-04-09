import React from "react";
import {
    MapPinIcon,
    CheckBadgeIcon,
    UserGroupIcon,
    HeartIcon
} from "@heroicons/react/24/outline";
import Nav from "../layout/Nav";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function View() {

    const [costs, setCost] = React.useState([])
    const [c, setC] = React.useState(0.0)
    const [desc, setDesc] = React.useState("")
    const [name, setName] = React.useState("")
    const navigate = useNavigate();
    let [co, setCO, delCO] = useCookies(['cname'])

    function getCosts() {
        fetch(`/fin/costs/retrieve`)
            .then(res => res.json())
            .then(r => setCost(r))
    }

    function addCost() {
        fetch(`/fin/costs/add`, {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                desc: desc,
                cost: c
            })
        })
    }

    const handleSubmit = () => {
        const date = new Date();

        let time = `${date.getHours()}:${date.getMinutes()}`
        let _date = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

        setSubmitted(true);
        fetch(`/fin/log-cost`, {
            body: JSON.stringify({
                "title": name,
                "desc": desc,
                "cname": co
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
                    <Forms title="Debt Name" type="text" value={name} change={setName} />
                    <Forms
                        title="Description"
                        type="text"
                        value={desc}
                        change={setDesc}
                    />
                    <Forms title="Cost ($)" type="number" value={c} change={setC} />
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
                            <p className="p-1">Add a Cost</p>
                        </div>
                    </button>
                    {submitted && (
                        <div>
                            <p>Success!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Nav(View);