'use client'

import { useState, useEffect } from "react"
import { useForm }  from 'react-hook-form'
import { toast } from "react-hot-toast"
type QuestTypes = {

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
    

    const {register, handleSubmit} = useForm()

    const [questionNumber, setQuestionNumber] = useState<number>(0)
    const [ansewTemplate, setAnswerTemplate] = useState<{answer: string, choice: string}[]>([])
    const [selectedClass, setSelectedClass] = useState<string>('  text-default_purple')
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
        console.log(props.questions)
    }, [])

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

    return(
        <div className="w-full h-screen absolute top-[-144px] z-50 bg-slate-200 flex flex-col items-center">
            
            <div className="w-full h-1/3 bg-default_purple ">
                <aside>
                    <button>Cancelar questionário</button>
                </aside>
            </div>
            <main className="w-1/2 h-3/4 bg-white rounded-lg mt-[-120px]">
                
                <header className="w-full h-1/6 p-4 flex items-center text-lg font-semibold rounded-t-lg">
                    <h1>Questão {questionNumber+1}. {props.questions[questionNumber].description}</h1>
                </header>

                <div className="h-4/6 w-full flex flex-col p-8 justify-between">
                    
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
                    <button type="submit" onClick={handleNextQuestion} className={`p-4 flex  items-center justify-center rounded-md text-white bg-default_purple`}>Próxima</button>
                    }

                    {questionNumber === props.questions.length - 1
                    &&
                    <button type="submit" className={`p-4 flex  items-center justify-center rounded-md text-white bg-green-500`}>Finalizar</button>
                    }
                </footer>

            </main>
            
        </div>
    )
}

