'use client'

import Image from 'next/image'
import information_security from '../../../assets/information-secured.svg'
import { BsArrowLeft } from 'react-icons/bs'
import Link from 'next/link'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { signOut } from 'next-auth/react'

export default function CreatePassword(){

    const pathname = usePathname()

    const { register, handleSubmit } = useForm<{password: string, repeated_password: string}>()
    const { push } = useRouter()


    async function createUser(data: {password: string, repeated_password: string}) {
        if(data.password){
            if(data.password !== data.repeated_password){
                return toast.error("As senhas devem ser iguais")
            }
            else{
                
                axios.post(`${process.env.NEXT_PUBLIC_API}/auth/signup`,{
                    email: pathname?.replace('/create/', ''),
                    password: data.password
                })
                .then((res)=>{
                    console.log(res)
                    sessionStorage.setItem("token", res.data.token)
                    push('/home')
                        
                    
                })
            }
        }
    }

    return(
        <div className="w-full h-screen flex">

            <aside className="h-screen w-[55%] flex flex-col p-32 justify-center">
                <h1 className='text-xl font-semibold'>
                    Identificamos que este é seu primeiro acesso.
                    <p>Seja bem-vindo(a)!</p>
                </h1>

                <span className='mb-6 text-slate-500'>Antes de prosseguirmos, por favor, defina uma senha</span>

                <form onSubmit={handleSubmit(createUser)} className='flex flex-col'>
                    <input {...register('password')} type="text" placeholder='Senha' className='border my-4 border-slate-400 rounded-sm px-5 py-2 w-2/3'/>
                    <input {...register('repeated_password')} type="text" placeholder='Repita a senha anterior' className='my-4 border border-slate-400 rounded-sm px-5 py-2 w-2/3'/>
                    <button type='submit' className='mt-6 w-1/4 rounded bg-default_purple text-white font-semibold py-2'>Pronto</button>
                </form>

            </aside>
            <aside className="h-screen w-[45%] bg-default_purple flex flex-col items-center justify-center">
                <span onClick={()=>signOut()} className='self-start  ml-9'> <Link className='flex items-center text-white' href={'login'}><BsArrowLeft/>  Login</Link></span>

                <Image src={information_security} alt='security'/>
            </aside>

        </div>
    )
}