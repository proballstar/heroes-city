import React from "react";
import app from "../firebase/firebase";
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import { useCookies } from "react-cookie";

export default function ConnectButton() {

    const [c, setC, delC] = useCookies(["cname"])
    const [b, setB, delB] = useCookies(["uid"])

    async function connect() {
        let company_name = prompt("What is the name for your company")
        let google = new GoogleAuthProvider();
        let auth = getAuth(app);
        await signInWithPopup(auth, google)
            .then(async res => {
                let {displayName, email, photoURL, uid } = auth.currentUser
                let req = await fetch(`/auth/register`, {
                    body: JSON.stringify({
                        name: displayName,
                        email: email,
                        pfp: photoURL,
                        uid: uid,
                        cname: company_name
                    }),
                    headers: new Headers({
                        "Content-Type": "application/json"
                    })
                })
                if(req.status == 200) {
                    setC(company_name)
                    setB(uid)
                } else {
                    window.location.reload()
                }
            })
    }

    return (
        <button onClick={() => connect()}>
            Connect with Heroes City
        </button>
    )
}