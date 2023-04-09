import React from "react";
import app from "../firebase/firebase";
import { signOut, getAuth } from 'firebase/auth';

import { useCookies } from "react-cookie";

export default function Logout() {

    const [c, setC, delC] = useCookies(["cname"])
    const [b, setB, delB] = useCookies(["uid"])


    async function end() {
        await signOut(getAuth(app));
        delC()
        delB()
    }

    return (
        <button onClick={() => end()}>
            Sign Out
        </button>
    )
}