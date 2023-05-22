'use client'

import { QuestionaryTypes } from "@/@types/QuestionaryTypes";
import CreateQuestionary from "@/components/CreateQuestionary/page";
import axios from "axios";
import { useEffect, useState } from "react";
import {useForm} from 'react-hook-form'
import { toast } from "react-hot-toast";

type QuestionsTypes = {
    description: string,
    alternatives:{
        title: string
    }[],
    answer:  string
}[]

export default function AdminQuestionaries(){

    const [questions, setQuestions] = useState<QuestionsTypes>([])


    const {register, handleSubmit} = useForm<QuestionaryTypes>()

    useEffect(()=>{
        console.log(questions)
    }, [questions])

    function submitQuestionary(data: QuestionaryTypes){
        axios.post(`${process.env.NEXT_PUBLIC_API}/questionaries/create`, {
            name: data.name,
            difficult: data.difficult,
            category: data.category,
            questions: questions
        }).then((res)=>{
            if(res.status === 201){
                toast.success("Questionário criado com sucesso!")
            }
        })
    }

    return(
        <div  className="p-10">
            <h1>Criar questionário</h1>

            <div>
                <form onSubmit={handleSubmit(submitQuestionary)} className="flex w-full">
                    <aside className="flex flex-col w-1/2 px-10">
                        <input required {...register('name')} type="text" placeholder="Nome do questionário" className="my-2 bg-slate-200 p-4 rounded" />
                        <select required {...register('difficult')} className="my-2 bg-slate-200 p-4 rounded">
                            <option value="">Dificuldade</option>
                            <option value="iniciante">Iniciante</option>
                            <option value="intermediario">Intermediário</option>
                            <option value="avancado">Avançado</option>
                        </select>

                        <select required {...register('category')} className="my-2 bg-slate-200 p-4 rounded">
                            <option value="">Categoria</option>
                            <option value="front-end">Front-end</option>
                            <option value="back-end">Back-end</option>
                            <option value="design">Design</option>
                            <option value="quality-assurance">Quality Assurance</option>
                        </select>
                    </aside>
                    <aside className="w-full">
                        <CreateQuestionary setQuestionary={setQuestions}/>
                    </aside>
                </form>
            </div>
        </div>
    )
}