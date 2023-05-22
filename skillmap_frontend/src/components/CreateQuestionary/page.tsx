'use client'

import { QuestionaryTypes } from "@/@types/QuestionaryTypes"
import { useEffect, useState } from "react"

type QuestionsTypes = {
    description: string,
    alternatives:{
        title: string
    }[],
    answer:  string
}[]

export default  function CreateQuestionary(props: {setQuestionary:  (a: any)=>void}){

    const [questions, setQuestions] = useState<QuestionsTypes>([])
    const [newQuestion, setNewQuestion] = useState<{
        description: string,
        alternatives:{
            title: string
        }[],
        answer: string
    }>(
        {
            alternatives: [{title: ''}],
            answer:'',
            description: ''
        }
    )

    const [description, setDescription] = useState<string>('')
    const [A, setA] = useState<string>('')
    const [B,  setB] = useState<string>('')
    const [C, setC] = useState<string>('')
    const [D, setD] = useState<string>('')
    const [E, setE ] = useState<string>('')
    const [answer, setAnswer ] = useState<string>('')

    

    function addQuestion(){



        setQuestions([...questions, {
            description: description,
            alternatives: [{title: A}, {title: B},{title: C},{title: D},{title: E},],
            answer: answer
        }])

    }


    useEffect(()=>{
        props.setQuestionary(questions)
    }, [questions])



    return(
        <div className="flex w-full">
            <aside className="flex flex-col w-1/2 px-6">

                <input required onChange={(e)=>{setDescription(e.target.value)}} placeholder="Enunciado" className="my-2 bg-slate-200 p-4 py-6 rounded" type="text"/>

                <section className="flex p-3 border border-slate-200 rounded my-2">
                    <p>A:</p>
                    <input required placeholder="Alternativa" onChange={(e)=>{setA(e.target.value)}} type="text" className="px-4 w-full focus:outline-none" name="" id="" />
                </section>
                <section className="flex p-3 border border-slate-200 rounded my-2">
                    <p>B:</p>
                    <input required placeholder="Alternativa" onChange={(e)=>{setB(e.target.value)}} type="text" className="px-4 w-full focus:outline-none" name="" id="" />
                </section>
                <section className="flex p-3 border border-slate-200 rounded my-2">
                    <p>C:</p>
                    <input required placeholder="Alternativa" onChange={(e)=>{setC(e.target.value)}} type="text" className="px-4 w-full focus:outline-none" name="" id="" />
                </section>
                <section className="flex p-3 border border-slate-200 rounded my-2">
                    <p>D:</p>
                    <input required placeholder="Alternativa" onChange={(e)=>{setD(e.target.value)}} type="text" className="px-4 w-full focus:outline-none" name="" id="" />
                </section>
                <section className="flex p-3 border border-slate-200 rounded my-2">
                    <p>E:</p>
                    <input required placeholder="Alternativa" onChange={(e)=>{setE(e.target.value)}} type="text" className="px-4 w-full focus:outline-none" name="" id="" />
                </section>


                <section className="flex p-3 border border-slate-200 rounded my-2 bg-slate-200">
                    <p className="">Resposta  correta:</p>
                    <input required onChange={(e)=>{setAnswer(e.target.value)}} type="text" className="px-4 w-full focus:outline-none" name="" id="" />
                </section>


                <button type="button" onClick={addQuestion} className="bg-default_purple p-4 text-white rounded">Adicionar pergunta</button>
            </aside>
            <section className='w-1/2'>
            <aside className="p-10 bg-default_purple overflow-y-auto max-h-[500px] full border border-slate-400 rounded break-words max-w-[480px]">
                {questions.length === 0 && <p className="text-white">Nenhuma questão cadastrada</p>}
                { questions.length > 0 && questions.map((question, index)=>{
                    return (
                        <div className="w-full bg-white my-2 p-4 rounded" key={index}>
                            <h1>Q{index+1} - {question.description}</h1>
                            <ul className="w-full">
                                {question.alternatives.map((alternatives, id)=>{
                                    return <li key={id}>{id === 0 ? 'a' : id === 1 ? 'b' : id === 2 ? 'c' : id === 3 ? 'd' : id === 4 ? 'e': ''}-{alternatives.title}</li>
                                })}
                            </ul>
                        </div>
                    )
                }) }

            </aside>
                <footer className="flex justify-end my-2">
                <button  type="submit" className="bg-green-500 p-4 text-white rounded">Salvar</button>
                </footer>
            </section>
        </div>
    )
}