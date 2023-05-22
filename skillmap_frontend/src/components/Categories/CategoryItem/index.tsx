'use client'

import { TopicTypes } from "@/@types/TopicTypes"
import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ImFileEmpty } from 'react-icons/im'

type CategoryTypes = {
    name: string
}

export default function CategoryItem(props: CategoryTypes){

    const [categories, setCategories] = useState<TopicTypes[]>()
    const  {push} = useRouter()

    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_API}/topics/list/${props.name}/5`).then((res)=>{
            setCategories(res.data)
            console.log(res.data)
        })
    }, [])

    return(
        <section>
            {categories?.length! > 0 && 
            
            <>
            
                <div className="grid grid-cols-5 gap-x-9 p-10" >
                {categories?.map((categorie, index)=>{
                    return( 
                    <div onClick={()=>push(`/topics/${categorie._id}`)} key={index} className="relative border-[6px] border-transparent hover:border-default_purple min-h-[350px]  transition-all  rounded-2xl cursor-pointer">
                        <p className="absolute bg-default_purple w-full z-10 bottom-0 rounded-b-lg px-4 py-2 text-xl text-white">{categorie.name}</p> 
                        <img className="rounded-lg  h-full w-full" src={categorie.img} alt="" />
                    </div>
                    )
                })}
                </div>

                <footer className="cursor-pointer italic w-full text-end px-10 mt-[-20px]">Ver mais</footer>

                </>

            }

            {
                categories?.length! === 0 &&
                <section className="grid grid-cols-5 gap-x-9 p-10">
                    <div className="flex flex-col justify-between bg-slate-200 h-96  transition-all  rounded-2xl cursor-pointer">
                        <div className="h-full text-slate-400 flex items-center justify-center">
                            <ImFileEmpty size={50}/>
                        </div>
                        <p className=" w-full text-slate-600 italic z-10 bottom-0 rounded-b-lg px-4 py-2 text-xl ">Nenhum tópico cadastrado para esta categoria</p> 
                    </div>
                </section>
            }
        </section>
    )
}