'use client'

import { useSession, signOut, signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"
import { useEffect } from 'react';
import { useRouter } from "next/navigation";
import axios from "axios";

export default function GoogleLogin({enableCreatePassword}:{enableCreatePassword: (isEnabled: boolean)=> void}){

const {data: session} = useSession()

const {push} = useRouter()

    useEffect(()=>{
        if(session && session.user){
            console.log(session )
            axios.get(`http://localhost:3333/users/${session.user.email}`)   
            .then((res)=>{
                console.log(res)
                if(res.data){
                    
                    sessionStorage.setItem("token", res.data.token)
                    push("/home")
                }
                else{
                    console.log(res)
                    push(`/create/${session.user?.email}`)
                }
            })
            
        }
    }, [session])

    return(
        <button onClick={()=>signIn()} className='mt-9 relative flex justify-center my-3 border border-slate-300 w-[430px] h-14 rounded-sm p-2 bg-white items-center'>
        <FcGoogle size={30} className='mr-5 w-14 absolute left-4'/> 
        Entrar com sua conta Google 
        </button>
    )

}