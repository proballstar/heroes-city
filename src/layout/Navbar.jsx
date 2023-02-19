import React, { useState } from "react"
import { onAuthStateChanged, getAuth } from "firebase/auth"
import app from "../firebase/firebase"
import { creds, home } from './Link'
import { useNavigate } from 'react-router-dom'
import ConnectButton from "./ConnectButton"
import Logout from "./Logout"

export default function Navbar() {
    
    const [auth, setAuth] = useState()
    const [links, setLinks] = useState(home)
    const navigate = useNavigate()

    onAuthStateChanged(getAuth(app), (user) => {
        if (user) {
            setAuth(true)
            setLinks(creds)
            
        } else {
            setAuth(false)
            setLinks(home)
        }
    })



    return (
        <nav>
            {links.map((link, index) => {
                return (
                    <button onClick={async () => await navigate(link.pa)}>
                        {link.t}
                    </button>
                )
            })}
            {auth ? <Logout /> : <ConnectButton />}
        </nav>
    )
}