'use client'

import QuestionaryInit from "@/components/QuestionaryInit"
import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

type QuestionaryTypes={
    _id:  string,
    category: string,
    difficult:  string,
    name: string,
    questions: {
        alternatives:{
            title:  string,
            _id: string
        }[],
        answer: string,
        description: string,
        _id: string
    }[]
}

export default function QuestionaryId(){
    const params = useParams()

    const [questionary, setQuestionary] = useState<QuestionaryTypes>()

    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_API}/questionaries/${params!.id}`)
        .then((res)=>{
            setQuestionary(res.data)
        })
    }, [])

    const [ isQuestInit, setQuestInit ] = useState(false)


    return(
        <div className="relative">
            {!isQuestInit &&
            
            <div className="p-10 flex h-[calc(100vh-9rem)]">

            <aside className=' flex flex-col justify-between w-full'>
                <main>
                    <h1 className="text-xl font-semibold">{questionary?.name}</h1>
                    <hr className="my-4"/>
                    <p className="my-6 text-slate-500"><strong className="font-semibold">Dificuldade:</strong> {questionary?.difficult}</p>
                    <p className="my-6 text-slate-500"><strong className="font-semibold">Qtd. de perguntas:</strong> {questionary?.questions.length}</p>
                </main>

                <div className="flex flex-col justify-end w-56">
                    <button onClick={()=>setQuestInit(true)} className="bg-default_purple px-6 py-4 rounded text-white">Responder agora!</button>
                </div>
            </aside>

            </div>

            }

            {
                isQuestInit && 
                <div>

                    <QuestionaryInit _id={questionary?._id!} name={questionary?.name!} questions={questionary?.questions!}/>

                </div>
            }
        </div>
    )
}