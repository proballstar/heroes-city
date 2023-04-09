import React from 'react';
import { getAuth } from 'firebase/auth'
import { useState } from 'react'
import Form from "../../layout/Field"
import Nav from '../../layout/Nav';
import { ArrowPathIcon, Icon } from '@heroicons/react/24/outline'
import { useCookies } from 'react-cookie';

function CreatePost() {
    
    const [star, setStar] = useState(0)
    const [desc, setDesc] = useState('')
    const [title, setTitle] = useState('')
    const [_res, _setRes] = useState('')
    const [submitted, setSubmitted] = React.useState(false);
    const [cname, setCName] = useCookies(['cname'])

    async function generateEvals(e) {
        
        setSubmitted(true)

        const headers = new Headers()
        headers.append("Content-Type", "application/json")

        let auth = getAuth()
        let qs = `The employee ${title} has obtained the following point from their manager, with the following ${report} ultimately leading him to recieve a ${star}/5 stars`
        let params = new URLSearchParams({"q": qs, "prev": title, "cname": cname})
        let res = await fetch(`/ans?${params.toString()}`)
        
        _setRes(res)
        
        setSubmitted(false)
    }

    return (
        <div style={{ width: '100vh' }}>
            <form>
                <p className="text-4xl font-bold m-3">Create Post about your favorite hero or topic to facilitate change!</p>
                <Forms title="Full Name" type="text" value={title} change={setTitle} />
                <Forms title="Report" type="textarea" value={desc} change={setDesc} />
                <Forms title="Star (out of 5)" type="number" value={star} change={setStar} />
                <button
                        className="outline-none animate-bounce p-2 border-2 border-green-900 font-semibold text-green-800 rounded-lg m-2 outline-none"
                        onClick={() => generateEvals()}
                        disabled={submitted}
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
                            <p className="p-1">Evaluate Worker</p>
                        </div>
                    </button>
                    {submitted && (
                        <div>
                            {_res}
                        </div>
                    )}
            </form>
        </div>
    )
}

export default Nav(CreatePost)