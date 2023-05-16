
'use client'

import Image from 'next/image'
import bg_create from '../../assets/bg-create.svg'
import Link from 'next/link'

import {BsArrowLeft} from 'react-icons/bs'

export default function Create(){
    return(
        <div className="w-screen h-screen flex ">

            <aside className="w-[45%] h-full bg-default_purple flex flex-col justify-end items-start">
                <span className='self-end mr-9'> <Link className='flex items-center text-white' href={'login'}><BsArrowLeft/>  Login</Link></span>
                <Image alt='bg_create' className=' ' src={bg_create}></Image>
            </aside>

            <aside className="w-[55%] bg-slate-100 flex flex-col items-center justify-center h-full">
                    <h1 className='text-4xl font-semibold text-[#363636]'>Primeiros passos</h1>
                    <span className='font-semibold text-xl text-slate-400 mb-7'>Preencha seus dados</span>
                    
                    <form className='w-4/5 flex flex-col items-center'>
                        <section className='grid grid-cols-2 gap-x-6 gap-y-4'>
                            <input type="text" placeholder='Nome' className='col-span-1 h-14 rounded bg-transparent border-2 border-slate-300 px-3'/>
                            <input type="text" placeholder='Sobrenome' className='col-span-1 h-14 rounded bg-transparent border-2 border-slate-300 px-3'/>
                            <input type="text" placeholder='E-mail' className='col-span-1 h-14 rounded bg-transparent border-2 border-slate-300 px-3'/>
                            <input type="text" placeholder='N° de telefone' className='col-span-1 h-14 rounded bg-transparent border-2 border-slate-300 px-3'/>
                            <section className='grid grid-cols-3 col-span-2 gap-x-6 gap-y-4 '>
                            <input type="text" placeholder='Data de nasc.' className='col-span-1 h-14 rounded bg-transparent border-2 border-slate-300 px-3'/>
                            <input type="text" placeholder='Mês de nasc.'className='col-span-1 h-14 rounded bg-transparent border-2 border-slate-300 px-3'/>
                            <input type="text" placeholder='Ano de nasc.'className='col-span-1 h-14 rounded bg-transparent border-2 border-slate-300 px-3'/>
                            </section>
                            <input type="text" placeholder='Senha' className='col-span-1 h-14 rounded bg-transparent border-2 border-slate-300 px-3'/>
                            <input type="text" placeholder='Confirme a senha' className='col-span-1 h-14 rounded bg-transparent border-2 border-slate-300 px-3'/>
                        </section>

                        <button className='bg-default_purple rounded w-80 h-14 text-white mt-6'>Criar conta</button>
                    </form>
            </aside>

        </div>
    )
}