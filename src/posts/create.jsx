import React from 'react';
import { getAuth } from 'firebase/auth'
import { useState } from 'react'
import Forms from '../events/form';
import Nav from '../layout/Nav';

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
                <Forms title="Title" type="text" value={title} change={setTitle} />
                <Forms title="Description" type="textarea" value={desc} change={setDesc} />
                <Forms title="Content" type="textarea" value={content} change={setContent} />
                <button onClick={(e) => handleSubmit(e)} disabled={submitted}>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Nav(CreatePost)