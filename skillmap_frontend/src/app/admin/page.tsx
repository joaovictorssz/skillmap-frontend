'use client'

import CreateRoadmap from "@/components/CreateRoadmap";
import { useState } from "react";
import { useForm } from 'react-hook-form'

type NewTopicTypes = {
    category: string,
    name: FileList,
    img: any,
    overview: {
        creators: string,
        creation_date: string,
        price: string,
        resume: string,
        use: string,
        links: string
    };
    roadmap: {
        steps: {
            name: string
        }[]
    }

}

export default function AdminPage(){

    const { register, handleSubmit } = useForm<NewTopicTypes>()
    const [roadmap, setRoadmap] = useState<{name:  string}[]>()

    function handleCreateTopic(data: NewTopicTypes){
        console.log({...data, test: roadmap})
    }

    return( 
        <div className="px-10 w-full">
           <form onSubmit={handleSubmit(handleCreateTopic)} className="w-full flex">
                <aside className="w-2/5">
                    <h1>Cadastrar tópicos</h1>

                    <section className="flex p-10">
                        <div className="flex flex-col w-full">
                            
                            <input {...register('name')} className="border border-slate-300 rounded-md my-2 bg-slate-100 px-4 py-2" placeholder="Nome do tópico" />
                            <select {...register('category')} className="border border-slate-300 rounded-md my-2 bg-slate-100 px-4 py-2" >
                                <option value="">Categoria</option>
                                <option value="design">Design</option>
                                <option value="front-end">Front-End</option>
                                <option value="back-end">Back-End</option>
                                <option value="quality-assurance">Quality Assurance</option>
                            </select>

                            <span>Detalhes do tópico</span>
                            <section className="flex flex-col">
                                <textarea {...register('overview.resume')} className="border border-slate-300 rounded-md my-2 bg-slate-100 px-4 py-2" placeholder="Overview"/>
                                <input {...register('overview.creators')} className="border border-slate-300 rounded-md my-2 bg-slate-100 px-4 py-2" type="text" placeholder="Criador(es)"/>
                                <label  htmlFor="">Data de criação</label>
                                <input  {...register('overview.creation_date')} className="border border-slate-300 rounded-md my-2 bg-slate-100 px-4 py-2" type="date" placeholder="Data de criação"/>
                                <input {...register('overview.price')} className="border border-slate-300 rounded-md my-2 bg-slate-100 px-4 py-2" type="text" placeholder="Preço"/>
                                <input {...register('overview.use')} className="border border-slate-300 rounded-md my-2 bg-slate-100 px-4 py-2" type="text" placeholder="Uso"/>
                                <input {...register('overview.links')} className="border border-slate-300 rounded-md my-2 bg-slate-100 px-4 py-2" type="text" placeholder="Link"/>                        
                            </section>
                            
                        </div>
                    </section>
                </aside>

                <aside className="flex flex-col">
                    <h1>Configure o RoadMap do tópico</h1>
                    <CreateRoadmap setRoadmap={setRoadmap}/>
                </aside>

                <aside className="flex flex-col">
                    <h1>Adicione uma imagem para o Tópico</h1>

                    <section className="mt-10">
                        <input {...register('img')} type="file" />
                    </section>

                    
                </aside>

                <div className="flex flex-col justify-end">
                    <button type='submit' className="rounded text-white cursor-pointer hover:bg-green-400 transition-all bg-green-500 p-4">Adicionar</button>
                </div>
                
           </form>
        </div>
    )
}