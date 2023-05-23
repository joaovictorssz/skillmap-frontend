import { userContext } from "@/contexts/UserContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { signOut } from 'next-auth/react';

export default function Topbar(){

    const { user } = useContext(userContext)
    const pathName = usePathname()

    return(
        <div className="w-full flex flex-col px-5 h-36 justify-center fixed top-0 bg-white z-40">
            <div className="relative">
                <section className="w-full flex justify-center items-center">
                    <input 
                    className="bg-slate-300 w-2/4 px-6 py-2 rounded-full text-slate-900" 
                    type="text" 
                    name="search" 
                    id="search"
                    placeholder="Pesquise por categorias (Ex: Design, Front-end...)"/>
                </section>
                <section className="w-full p-5">
                    <Link className={`mx-3 ${pathName?.includes('home') ? 'border-b-2 font-semibold border-default_purple' : 'text-slate-500'}`} href={'/home'}>Home</Link>
                    <Link className={`mx-3 ${pathName?.includes('questionarios') ? 'border-b-2 font-semibold border-default_purple' : 'text-slate-500'}`} href={'/questionarios'}>Questionários</Link>
                    <Link className={`mx-3 ${pathName?.includes('historico') ? 'border-b-2 font-semibold border-default_purple' : 'text-slate-500'}`} href={'/historico'}>Seu histórico</Link>
                    <Link className={`mx-3 ${pathName?.includes('salvos') ? 'border-b-2 font-semibold border-default_purple' : 'text-slate-500'}`} href={'/salvos'}>Salvos</Link>
                    <Link className={`mx-3 ${pathName?.includes('categorias') ? 'border-b-2 font-semibold border-default_purple' : 'text-slate-500'}`} href={'/categorias'}>Categorias</Link>
                    {user.admin === "true"  &&  <Link className={`mx-3 ${pathName?.includes('admin_topics') ? 'border-b-2 font-semibold border-default_purple' : 'text-slate-500'}`} href={'/admin_topics'}>Add Topics</Link>}
                    {user.admin === "true"  &&  <Link className={`mx-3 ${pathName?.includes('admin_questionaries') ? 'border-b-2 font-semibold border-default_purple' : 'text-slate-500'}`} href={'/admin_questionaries'}>Add Questionaries</Link>}

                    
                </section>

            </div>


        </div>
    )
}