'use client'

import { signOut } from 'next-auth/react';

export default function Home(){

    return(
        <div>Home
            <button onClick={
                ()=>{
                    signOut()
                    localStorage.clear()
                }
                }>signOut</button>
        </div>
    )
}