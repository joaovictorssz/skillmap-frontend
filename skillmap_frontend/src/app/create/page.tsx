
'use client'

import Image from 'next/image'
import bg_create from '../../assets/bg-create.svg'
import Link from 'next/link'
import {BsArrowLeft} from 'react-icons/bs'
import { useForm } from 'react-hook-form'
import { UserTypes } from './../../@types/UserTypes';
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'


export default function Create(){

    const [ password, setPassword ]  = useState<string>('')
    const [ repeatPassword, setRepeatPassword ]  = useState<string>('')


    const {register, handleSubmit} = useForm<UserTypes>()

    const {push} = useRouter()

    function createUser(data: UserTypes){
        if(password !== '' && password === repeatPassword){
            axios.post(`${process.env.NEXT_PUBLIC_API}/auth/signup`, {
                name: data.name,
                last_name: data.last_name,
                email: data.e_mail,
                password: password,
                admin: "false"
            })
            .then((res)=>{
                if(res.status === 201){
                    toast.success("Usuário criado!")
                    push("/login")
                }
            })
        }
    }

    return(
        <div className="w-screen h-screen flex ">

            <aside className="w-[45%] h-full bg-default_purple flex flex-col justify-end items-start">
                <span className='self-end mr-9'> <Link className='flex items-center text-white' href={'login'}><BsArrowLeft/>  Login</Link></span>
                <Image alt='bg_create' className=' ' src={bg_create}></Image>
            </aside>

            <aside className="w-[55%] bg-slate-100 flex flex-col items-center justify-center h-full">
                    <h1 className='text-4xl font-semibold text-[#363636]'>Primeiros passos</h1>
                    <span className='font-semibold text-xl text-slate-400 mb-7'>Preencha seus dados</span>
                    
                    <form onSubmit={handleSubmit(createUser)} className='w-4/5 flex flex-col items-center'>
                        <section className='grid grid-cols-2 gap-x-6 gap-y-4'>
                            <input {...register('name')} type="text" placeholder='Nome' className='col-span-1 h-14 rounded bg-transparent border-2 border-slate-300 px-3'/>
                            <input {...register('last_name')} type="text" placeholder='Sobrenome' className='col-span-1 h-14 rounded bg-transparent border-2 border-slate-300 px-3'/>
                            <input {...register('e_mail')} type="text" placeholder='E-mail' className='col-span-2 h-14 rounded bg-transparent border-2 border-slate-300 px-3'/>
                            <input onChange={(e)=> setPassword(e.target.value)} type="password" placeholder='Senha' className='col-span-2 h-14 rounded bg-transparent border-2 border-slate-300 px-3'/>
                            <input onChange={(e)=> setRepeatPassword(e.target.value)} type="password" placeholder='Confirme a senha' className='col-span-2 h-14 rounded bg-transparent border-2 border-slate-300 px-3'/>
                        </section>

                        <button type='submit' className='bg-default_purple rounded w-80 h-14 text-white mt-6'>Criar conta</button>
                    </form>
            </aside>

        </div>
    )
}