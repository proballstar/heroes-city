import React from "react";
import app from "../firebase/firebase";
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'

export default function ConnectButton() {

    async function connect() {
        let google = new GoogleAuthProvider();
        let auth = getAuth(app);
        await signInWithPopup(auth, google)
    }

    return (
        <button onClick={() => connect()}>
            Connect with Heroes City
        </button>
    )
}