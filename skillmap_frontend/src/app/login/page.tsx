'use client'

import { useForm } from 'react-hook-form'
import bg_login from '../../assets/bg-login.svg'
import Image from 'next/image'
import Link from 'next/link'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import GoogleLogin from '@/components/GoogleLogin'
import {useState} from 'react'

export default function Login(){

    const { push } = useRouter()

    const {register, handleSubmit} = useForm<{email: string, password: string}>()

    const  handleLogin = async (data: {email: string, password: string})=>{
        await axios.post(`${process.env.NEXT_PUBLIC_API}/auth/signin`,{
            email: data.email,
            password: data.password
        }).then((res)=>{
            if(res.status === 401){
                return toast.error("Email ou senha incorretos")
            }

            if(res.status === 201){
                localStorage.setItem("token", res.data.token)
                push("/home")
            }
        })
    }

    const toastHandler = (data: {email: string, password: string})=>{
        toast.promise(handleLogin(data), {
            error: "Algo deu errado!",
            loading: "Carregando...",
            success: "Seja bem-vindo(a)!"
        })
    }

    const [isEnabled, setIsEnabled] = useState<boolean>(false)

    return(
        <div className="w-screen h-screen flex relative">
            

            <aside className="w-[55%] h-full bg-slate-100 flex flex-col justify-center items-center">

                <h1 className='text-3xl font-semibold'>Olá, bem vindo(a) de volta! 👋</h1>
                <GoogleLogin enableCreatePassword={setIsEnabled}/>

                <div className='flex justify-center items-center w-full h-10 relative'>
                    
                    <p className='text-slate-400'>ou</p>
                </div>

                <form onSubmit={handleSubmit(toastHandler)} className='flex w-full flex-col items-center'>
                    <input placeholder='E-mail' {...register('email')} type="text" name="email" id="email" className='my-3 border border-slate-300 w-[430px] h-14 rounded-sm p-2'/>
                    <input placeholder='Password' {...register('password')} type="password" name="password" id="password" className='mt-3 border border-slate-300 w-[430px] h-14 rounded-sm p-2'/>
                    <button type="submit" className='mt-4 w-56 h-14 rounded-md bg-default_purple text-white'>Login</button>
                </form>

                <span className='mt-4 font-semibold'>É novo por aqui? <Link className='text-default_purple' href={'create'}>Crie sua conta</Link></span>
            </aside>
            <aside className="w-[45%] flex flex-col justify-end bg-default_purple h-full">
                <Image src={bg_login} alt='bg_login'/>
            </aside>

        </div>
    )
}