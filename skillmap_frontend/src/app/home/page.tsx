'use client'

import { signOut } from 'next-auth/react';

export default function Home(){

    return(
        <div className='h-screen w-full'>

            <nav>
                
            </nav>
            
            
            
            <button onClick={
                ()=>{
                    signOut()
                    sessionStorage.clear()
                }
                }>signOut</button>
        </div>
    )
}