import React from 'react';
import { getAuth } from 'firebase/auth'
import { useState } from 'react'
import Forms from '../events/form';
import Nav from '../layout/Nav';

function CreatePost() {
    
    let [cover, setCover] = useState()

    const [content, setContent] = useState('')
    const [desc, setDesc] = useState('')
    const [title, setTitle] = useState('')
    const [submitted, setSubmitted] = React.useState(false);

    
    function handleFileUpload(e) {
        let files = e.currentTarget.files;
        setCover(files[0])
    }

    async function handleSubmit(e) {
        
        setSubmitted(true)
        const fd = new FormData();
        let auth = getAuth()
        fd.append("uid", auth.currentUser.uid)
        fd.append("name", auth.currentUser.displayName)
        fd.append("image", cover)
        fd.append("content", content)
        fd.append("description", desc)
        fd.append("title", title)

        const headers = new Headers()
        headers.append("Content-Type", "multipart/form-data")

        await fetch(`https://Hero-City-Backend.epiccodewizard2.repl.co/posts/create`, {
            method: "POST",
            body: fd,
            headers: headers
        })
        setSubmitted(false)

    }

    return (
        <div style={{ width: '100vh' }}>
            <form>
                <Forms title="Title" type="text" value={title} change={setTitle} />
                <div>
                    <label>
                        Cover:
                    </label>
                    <input name='file' type={'file'} onChange={e => handleFileUpload(e)} />
                </div>
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