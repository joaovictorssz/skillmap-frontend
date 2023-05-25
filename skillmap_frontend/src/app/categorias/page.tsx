'use client'

import { TopicTypes } from "@/@types/TopicTypes"
import CategoryItem from "@/components/Categories/CategoryItem"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ImFilesEmpty } from "react-icons/im"

export default function Categorias(){
    
    const [selected_category, setSelected_category] = useState<string>('front-end')
    const [content, setContent] = useState<TopicTypes[]>()

    

    const [categories, setCategories] = useState<TopicTypes[]>()
    const  {push} = useRouter()

    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_API}/topics/category/${selected_category}`).then((res)=>{
            setCategories(res.data)
            console.log(res.data)
        })
    }, [])


    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_API}/topics/category/${selected_category}`).then((res)=>{
            setCategories(res.data)
            console.log(res.data)
        })
    }, [selected_category])

    return(
        <div className="p-10">
            <nav className="flex w-full justify-center">
                <button onClick={()=>setSelected_category("front-end")} className="mx-4">Front-end</button>
                <button onClick={()=>setSelected_category("back-end")} className="mx-4">Back-end</button>
                <button onClick={()=>setSelected_category("design")} className="mx-4">Design</button>
                <button onClick={()=>setSelected_category("quality-assurance")} className="mx-4">Quality Assurance</button>
            </nav>

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

                </>

            }

            {
                categories?.length! === 0 &&
                <section className="grid grid-cols-5 gap-x-9 p-10">
                    <div className="flex flex-col justify-between bg-slate-200 h-96  transition-all  rounded-2xl cursor-pointer">
                        <div className="h-full text-slate-400 flex items-center justify-center">
                            <ImFilesEmpty size={50}/>
                        </div>
                        <p className=" w-full text-slate-600 italic z-10 bottom-0 rounded-b-lg px-4 py-2 text-xl ">Nenhum tópico cadastrado para esta categoria</p> 
                    </div>
                </section>
            }
        </section>
        </div>
    )
}