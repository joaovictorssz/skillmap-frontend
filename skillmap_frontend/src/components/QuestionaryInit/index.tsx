'use client'

import { userContext } from "@/contexts/UserContext"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState, useEffect, useContext, useRef } from "react"
import { useForm }  from 'react-hook-form'
import { toast } from "react-hot-toast"
import { BsFillFileEarmarkCheckFill } from "react-icons/bs"
import { MdError } from "react-icons/md"
import {  AiOutlineClockCircle } from 'react-icons/ai'

type QuestTypes = {

    _id:  string,
    category?: string,
    difficult?:  string,
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

export default function QuestionaryInit(props: QuestTypes){

    window.addEventListener('beforeunload', function(e) {
        e.preventDefault();
        e.returnValue = '';
        return 'Deseja voltar para a página anterior?';
    });
    const { user,configUser } = useContext(userContext)
    
    const { push } = useRouter()

    const [questionNumber, setQuestionNumber] = useState<number>(0)
    const [ansewTemplate, setAnswerTemplate] = useState<{answer: string, choice: string}[]>([])
    const [userPoints, setUserPoints] = useState<number>(0)
    const [isQuestionaryEnded, setIsQuestionaryEnded] = useState<boolean>(false)
    const [seconds, setSeconds] = useState(3600);


    function endQuestionary(){

        let points = 0

        console.log(ansewTemplate)
        ansewTemplate.map((answer, id)=>{
            if(answer.choice.toLowerCase().trim() === answer.answer.toLowerCase().trim()){
                console.log("this ", answer.choice.toLowerCase().trim(), 'is = ',answer.answer.toLowerCase().trim())
                points++
            }
            else{
                console.log(false)
            }
        
        })

        setUserPoints(points)
        setIsQuestionaryEnded(true)
    }

    function handleNextQuestion(){
        if(ansewTemplate.length < questionNumber+1){
            return toast.error("Você precisa selecionar alguma alternativa!")
        }
        else{
            setQuestionNumber(questionNumber+1)
        }
    }

    function handlePreviousQuestion(){
        setQuestionNumber(questionNumber-1)
    }

    function test(choice: string, index: number){
        const newArray = [...ansewTemplate]
        newArray[index] = {choice: choice, answer: props.questions[index].answer }
        setAnswerTemplate(newArray)
    }

    useEffect(()=>{
        if(ansewTemplate){
            console.log(ansewTemplate)
        }
    }, [ansewTemplate])

    useEffect(()=>{
        if(isQuestionaryEnded === true){
            axios.put(`${process.env.NEXT_PUBLIC_API}/users/update/${user._id}`, {
                history: [...user.history, {questionary_id: props._id, pontuation: userPoints, title: props.name}]
            })
            .then((res)=>{
                configUser(res.data)
                sessionStorage.setItem("user", JSON.stringify(res.data))
                toast.success("Pontuação salva!")
                
            })
        }
    }, [isQuestionaryEnded])

    function setClassname(id: number){

        const inputs = document.querySelectorAll('section')
        inputs.forEach((radio)=>{
            radio?.classList.remove('border-default_purple')
            radio?.classList.remove('text-default_purple')
        })

        const item = document.getElementById(`item_${id}`)
        item?.classList.add('border-default_purple')
        item?.classList.add('text-default_purple')
    }
      

    useEffect(()=>{
        const inputs = document.querySelectorAll('section')
        inputs.forEach((radio)=>{
            radio?.classList.remove('border-default_purple')
            radio?.classList.remove('text-default_purple')
        })
    }, [questionNumber])

    useEffect(()=>{
        const timer = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds - 1);
          }, 1000);
      
          return () => clearInterval(timer);    
    }, [])

    useEffect(()=>{
        if(seconds === 0){
            setIsQuestionaryEnded(true)
        }
    }, [seconds])

    const formatTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      };

    return(
        <div className="w-full">
        
            {!isQuestionaryEnded && 
            
            <div className="w-full h-screen absolute top-[-144px] z-50 bg-slate-200 flex flex-col items-center">
                
                <div className="w-full h-1/3 bg-default_purple ">
                    <section className="flex justify-between items-center px-10 py-10">
                        <button onClick={()=>push('/questionarios')} className="bg-red-500 text-white font-semmibold rounded py-4 px-2">Cancelar questionário</button>

                        <div className="flex text-slate-200 items-center">
                         <AiOutlineClockCircle/> <p className="mx-4">Tempo restante: </p><span id="minutes">{formatTime(seconds)}</span>
                        </div>
                    </section>
                    
                </div>
                <main className="w-1/2 h-3/4 bg-white rounded-lg mt-[-120px]">
                    
                    <header className="w-full h-1/6 p-4 flex items-center text-lg font-semibold rounded-t-lg">
                        <h1>Questão {questionNumber+1}. {props.questions[questionNumber].description}</h1>
                    </header>

                    <div className="h-4/6 overflow-y-auto w-full flex flex-col p-8 justify-between">
                        
                        {props.questions[questionNumber].alternatives.map((alternative, id)=>{
                            return (
                                <div key={id} className="cursor-pointer">
                                
                                <section id={`item_${id}`} className="flex rounded-md border transition-colors cursor-pointer" onClick={()=>setClassname(id)}>
                                    <input className="hidden" onChange={(e)=>{test(e.target.value, questionNumber)}} type="radio" value={alternative.title} name={`alternative_choosen`}  id={`${id}`}/>
                                    <label htmlFor={`${id}`} className="w-full py-4 flex items-center px-6"
                                    key={id}>{
                                        id === 0 ? "a" :
                                        id === 1 ? "b" :
                                        id === 2 ? "c" :
                                    id === 3 ? "d" : ''}. {alternative.title}</label>
                                    
                                </section>
                                <hr/>
                                
                                </div>
                            )
                        })}

                        
                    </div>

                    <footer className="w-full flex justify-around h-10">
                        <button type="button" onClick={handlePreviousQuestion} disabled={questionNumber === 0 ? true : false} className={`p-4 flex  items-center justify-center rounded-md ${questionNumber === 0 ? 'bg-slate-400 text-slate-500 cursor-not-allowed' : 'text-white bg-default_purple'} `}>Anterior</button>
                        {questionNumber < props.questions.length - 1
                        &&
                        <button type="button" onClick={handleNextQuestion} className={`p-4 flex  items-center justify-center rounded-md text-white bg-default_purple`}>Próxima</button>
                        }

                        {questionNumber === props.questions.length - 1
                        &&
                        <button onClick={endQuestionary} type="submit" className={`p-4 flex  items-center justify-center rounded-md text-white bg-green-500`}>Finalizar</button>
                        }
                    </footer>

                </main>
                
            </div>
            
            }

            {
                isQuestionaryEnded &&

                <div className="w-full h-screen absolute top-[-144px] z-50 bg-slate-200 flex flex-col items-center">
                    <div className="w-full h-1/3 bg-default_purple ">
                        
                    </div>

                    <div className="w-1/2 max-h-[75%] bg-white rounded-lg mt-[-120px] p-10">
                        
                        <section className="px-10 pt-6">
                            <h1 className="text-2xl">Você finalizou com sucesso esse questionário!🏆</h1>
                            <section className="flex items-center justify-between py-4">
                            <p>Sua pontuação foi de: </p>
                            <span className="w-4 h-4 rounded-full bg-default_purple text-white font-semibold p-6 flex justify-center items-center">{userPoints}/{props.questions.length}</span>
                            </section>
                        </section>

                        <main className="px-10 max-h-[75%] overflow-y-auto">
                        {ansewTemplate.map((template, id)=>{
                            return( 
                            <section key={id} className="flex flex-col my-4 ">
                                <p className="text-lg font-semibold">{id+1}. {props.questions[id].description}</p>
                                <span className="text-slate-600"><strong className="font-semibold text-green-700">Resposta correta: </strong>{template.answer}</span>
                                <span className="text-slate-600 flex items-center"><strong className="font-semibold text-default_purple">
                                    Sua resposta: </strong>{template.choice} 
                                    {template.choice.toLowerCase().trim() === template.answer.toLowerCase().trim() ? <BsFillFileEarmarkCheckFill className="text-green-500 ml-2"/> : <MdError className="text-red-500 ml-2"/>}
                                </span>
                            </section>
                            )
                        })}
                        </main>

                        <footer className="flex justify-end py-4">
                            <button onClick={()=>push("/questionarios")} className="bg-default_purple rounded-md px-4 py-2 text-white">Voltar para a home</button>
                        </footer>
                    </div>

                    
                </div>
            }

        </div>
    )
}

