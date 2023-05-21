'use client'

import { useEffect, useRef, useState } from "react"
import { BsFillPencilFill, BsFillTrashFill, BsPencil, BsPencilFill } from "react-icons/bs"

type StepsTypes = {
    name: string
}[]

export default function CreateRoadmap({setRoadmap}: {setRoadmap: (roadmap:  {name: string}[]) => void}){

    const [steps, setSteps] = useState<StepsTypes>([
    ])

    const [stepName, setStepName] = useState<string>('')
    const [subStepName, setSubStepName] = useState<string>('')
    const tst = useRef<StepsTypes>([])

    function addStep(){
        setSteps([...steps!, {name: stepName}])
        console.log(steps)
    }

    function removeStep(index: number){
        const newArray = [...steps]
        newArray.splice(index, 1)
        setSteps(newArray)
        
    }

    function enableEdit(index: number){

        const div_edit = document.getElementById(`edit_item_${index}`) as HTMLDivElement
        const div_item = document.getElementById(`item_${index}`) as HTMLDivElement

        div_item.classList.add('hidden')
        div_edit.classList.remove('hidden')
        div_edit.classList.add('flex')

    }

    function saveEdit(index: number){
        const div_edit = document.getElementById(`edit_item_${index}`) as HTMLDivElement
        const div_item = document.getElementById(`item_${index}`) as HTMLDivElement

        div_item.classList.remove('hidden')
        div_edit.classList.add('hidden')
        div_edit.classList.remove('flex')

        const newArray = [...steps]
        newArray[index].name = stepName
        setSteps(newArray)
    }


    useEffect(()=>{
        setRoadmap(steps)
    }, [steps])

    return (
        <div className="p-10">

            <section className="flex items-center">
                <input onChange={(e)=>{setStepName(e.target.value)}} className="border border-slate-300 rounded-md rounded-r-none my-2 bg-slate-100 px-4 py-2" type="text" placeholder="Insira o nome do passo"/>
                <button type="button" onClick={addStep} className="p-4 bg-default_purple text-white px-4 py-2 rounded-r">+</button>
            </section>

            <main className=" max-w-sm">
                {steps.map((step, index)=>{ 
                    return( 
                    <div className="flex my-5  break-words" key={index}>
                        <section className="flex flex-col w-full ">
                            <div id={`item_${index}`} className="flex justify-between items-center w-full max-w-xl">
                                <p className="flex max-w-full overflow-x-auto" id={`item_${index}`}>{index+1} - {step.name}</p>
                                <section className="flex p-1">
                                    <BsFillTrashFill size={20} className="hover:text-red-500 text-slate-500" onClick={()=>removeStep(index)}/>
                                    <BsFillPencilFill size={20} className="ml-1 text-default_purple" onClick={()=>enableEdit(index)}/>
                                </section>
                            </div>

                            <div id={`edit_item_${index}`} className={`hidden justify-between`}>
                                <input className="border border-slate-300 rounded-md rounded-r-none bg-slate-100 px-4 py-2" onChange={(e)=>{setStepName(e.target.value)}} type="text" placeholder={`${step.name}`}/>
                                <button type="button" onClick={()=>saveEdit(index)} className="p-1 bg-green-500 text-white rounded-r">Save</button>
                            </div>
                            <hr className="my-4" />
                        </section>
                        

                    </div>
                    )
                })}
            </main>    
        </div>
    )
}