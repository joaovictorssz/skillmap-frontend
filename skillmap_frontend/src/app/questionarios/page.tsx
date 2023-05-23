'use client'

import axios from "axios"
import { useEffect, useState } from "react"
import { MdQuestionAnswer } from 'react-icons/md'
import { BsBookmark } from 'react-icons/bs'
import { useRouter } from "next/navigation"

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

    const { push } = useRouter()

    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_API}/questionaries/list_all`).then((res)=>{
            setQuestionaries(res.data)
        })
    }, [])

    function handleQuestionary(id: string){

        push(`/questionarios/${id}`)

    }

    return(
        <div className="p-10">
            <h1>Aqui você  encontra questionários para testar seus conhecimentos</h1>

            <main className="p-10 px-16">
                {questionaries?.map((questionary, index: number)=>{
                    return (
                        <div key={index} onClick={()=>handleQuestionary(questionary._id)} className="flex border bg-slate-100 border-slate-200 rounded-md w-2/3">
                            <section className="bg-default_purple p-8 rounded-l-md text-white"><MdQuestionAnswer size={30}/></section>
                            <main className="flex w-full justify-between items-center">
                                <div className="p-6">
                                    <p className="font-semibold">{questionary.name}</p>
                                    <p className="italic text-slate-400">{questionary.questions.length} perguntas</p>
                                </div>

                                <section>{questionary.difficult === 'iniciante' ? 'Iniciante' 
                                : questionary.difficult === 'intermediario' ? 'Intermediário' : 
                                questionary.difficult === 'avancado' ? 'Avançado' : ''}</section>

                                <BsBookmark size={20} className="mr-6"/>

                            </main>
                        </div>
                    )
                })}
            </main>
        </div>
    )
}