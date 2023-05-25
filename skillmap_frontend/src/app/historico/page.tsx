'use client'

import { userContext } from "@/contexts/UserContext"
import axios from "axios"
import { useContext, useEffect, useState } from "react"

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

export default function Historico(){

    const [questionaries, setQuestionaries] = useState()
    const {user} = useContext(userContext) 
    
    
    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_API}/questionaries/${user.history}`).then((res)=>{
            setQuestionaries(res.data)
        })
    }, [])

    return(
        <div className="p-10">

            <h1>Esse é seu histórico de questionários:</h1>

            <main>
                {user.history?.map((history, id)=>{
                    return (
                        <div key={id} className="w-1/2 my-4 px-10 py-6 bg-slate-100 flex justify-between items-center rounded-lg border border-slate-400">
                            <section>
                                <p>{history.title ? history.title : "Questionário sem nome"}</p>
                                <p>Pontuação: {history.pontuation}</p>
                            </section>

                            <section>🏆</section>
                        </div>
                    )
                })}
            </main>

        </div>
    )
}