'use client'

import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { MdQuestionAnswer } from 'react-icons/md'
import { BsBookmark } from 'react-icons/bs'
import { useRouter } from "next/navigation"
import { userContext } from "@/contexts/UserContext"

type QuestionaryTypes = {
    category: string,
    name: string,
    difficult: string,
    _id: string,
    questions: {
        description: string,
        answer: string,
        alternatives: {
           title: string 
        }[]
    }[]
}


export default function Questionarios(){

    const [questionaries, setQuestionaries] = useState<QuestionaryTypes[]>()
    const { user,configUser } = useContext(userContext)

    const { push } = useRouter()

    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_API}/questionaries/list_all`).then((res)=>{
            setQuestionaries(res.data)
        })
    }, [])

    function handleQuestionary(id: string){

        push(`/questionarios/${id}`)

    }

    function saveQuestionary(id: string){
        axios.put(`${process.env.NEXT_PUBLIC_API}/users/update/${user._id}`, {
            questionaries_saved: [...user.questionaries_saved, {questionary_id: id}]
        }).then((res)=>{
            configUser(res.data)
            sessionStorage.setItem("user", JSON.stringify(res.data))
        })
    }

    return(
        <div className="p-10">
            <h1>Aqui você  encontra questionários para testar seus conhecimentos</h1>

            <main className="p-10 px-16">
                {questionaries?.map((questionary, index: number)=>{
                    return (
                        <div className="flex items-center">
                        
                        <div key={index} onClick={()=>handleQuestionary(questionary._id)} className="flex my-4 cursor-pointer hover:border-default_purple rounded-md transition-colors border bg-slate-100 border-slate-200 w-2/3">
                            <section className="bg-default_purple p-8 rounded-l-md text-white"><MdQuestionAnswer size={30}/></section>
                            <main className="flex w-full items-center justify-between">
                                <div className="p-6">
                                    <p className="font-semibold">{questionary.name}</p>
                                    <p className="italic text-slate-400">{questionary.questions.length} perguntas</p>
                                </div>

                                <section className="mr-10 text-default_purple italic">{questionary.difficult === 'iniciante' ? 'Iniciante' 
                                : questionary.difficult === 'intermediario' ? 'Intermediário' : 
                                questionary.difficult === 'avancado' ? 'Avançado' : ''}</section>

                                

                            </main>
                        </div>
                        

                        </div>
                    )
                })}
            </main>
        </div>
    )
}