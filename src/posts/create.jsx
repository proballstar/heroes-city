import React from 'react';
import { getAuth } from 'firebase/auth'
import { useState } from 'react'
import Forms from '../events/form';
import Nav from '../layout/Nav';
import { ArrowPathIcon, PlusCircleIcon } from '@heroicons/react/24/outline'

function CreatePost() {
    
    const [content, setContent] = useState('')
    const [desc, setDesc] = useState('')
    const [title, setTitle] = useState('')
    const [submitted, setSubmitted] = React.useState(false);

    async function handleSubmit(e) {
        
        setSubmitted(true)

        const headers = new Headers()
        headers.append("Content-Type", "application/json")

        let auth = getAuth()

        await fetch(`https://Hero-City-Backend.epiccodewizard2.repl.co/posts/create`, {
            method: "POST",
            body: JSON.stringify({
                uid: auth.currentUser.uid,
                name: auth.currentUser.displayName,
                content: content,
                description: desc,
                title: title
            }),
            headers: headers
        })
        setSubmitted(false)

    }

    return (
        <div style={{ width: '100vh' }}>
            <form>
                <p className="text-4xl font-bold m-3">Create Post about your favorite hero or topic to facilitate change!</p>
                <Forms title="Title" type="text" value={title} change={setTitle} />
                <Forms title="Description" type="textarea" value={desc} change={setDesc} />
                <Forms title="Content" type="textarea" value={content} change={setContent} />
                <button
                        className="outline-none animate-bounce p-2 border-2 border-green-900 font-semibold text-green-800 rounded-lg m-2 outline-none"
                        onClick={() => handleSubmit()}
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
                            <p className="p-1">Add an Event</p>
                        </div>
                    </button>
                    {submitted && (
                        <div>
                            <p>You have created a post</p>
                        </div>
                    )}
            </form>
        </div>
    )
}

export default Nav(CreatePost)