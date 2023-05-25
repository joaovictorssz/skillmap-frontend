'use client'

import { useSession, signOut, signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"
import { useContext, useEffect } from 'react';
import { useRouter } from "next/navigation";
import axios from "axios";
import { userContext } from "@/contexts/UserContext";

export default function GoogleLogin({enableCreatePassword}:{enableCreatePassword: (isEnabled: boolean)=> void}){

    
    const { user,configUser } = useContext(userContext)

const {data: session} = useSession()

const {push} = useRouter()

    useEffect(()=>{
        if(session && session.user){
            console.log(session )
            axios.get(`${process.env.NEXT_PUBLIC_API}/users/${session.user.email}`)   
            .then((res)=>{
                console.log(res)
                if(res.data){
                    configUser!({
                        birth_date: '',
                        e_mail: res.data.email,
                        last_name: res.data.last_name ? res.data.last_name : '',
                        name: res.data.name ? res.data.name : '',
                        password: res.data.password,
                        phone_number: res.data.phone_number ? res.data.phone_number : '',
                        admin: res.data.admin ? 'true' : 'false',
                        _id: res.data._id,
                        history: res.data.history,
                        questionaries_saved: res.data.questionaries_saved,
                        topics_saved: res.data.topics_saved
                   },
                   )
                    sessionStorage.setItem("token", 'dcwquifhq379fqweefq4827ghiuqwgi')
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