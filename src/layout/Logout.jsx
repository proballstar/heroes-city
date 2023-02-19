import React from "react";
import app from "../firebase/firebase";
import { signOut, getAuth } from 'firebase/auth';


export default function Logout() {

    async function end() {
        await signOut(getAuth(app));

    }

    return (
        <button onClick={() => end()}>
            Sign Out
        </button>
    )
}