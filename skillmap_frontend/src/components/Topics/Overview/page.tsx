'use client'

import { TopicTypes } from "@/@types/TopicTypes"
import { userContext } from "@/contexts/UserContext"
import axios from "axios"
import { useContext } from "react"
import { toast } from "react-hot-toast"

type OverviewTypes = {
    data:  TopicTypes,
    id: string
}

export default  function Overview({data, id}:  OverviewTypes){

    const {user, configUser} = useContext(userContext)

    function saveTopic(){
        axios.put(`${process.env.NEXT_PUBLIC_API}/users/update/${user._id}`, {
            topics_saved: [...user.topics_saved, {topic_id: id, title:  data.name}]
        })
        .then((res)=>{
            configUser(res.data)
            sessionStorage.setItem("user", JSON.stringify(res.data))
            toast.success("Tópico salvo!")
            
        })
    }

    return(
        <div className="p-14 px-24">
            <h1 className="text-3xl mb-5 font-semibold text-default_purple">
                {data.name}
            </h1>

            <main className="text-lg">

                <p className="my-2 text-slate-600"><span className="font-semibold mr-3 text-slate-700">Criador(es):</span> {data.overview.creators}</p>
                <p className="my-2 text-slate-600"><span className="font-semibold mr-3 text-slate-700">Data de criação:</span> {data.overview.creation_date}</p>
                <p className="my-2 text-slate-600"><span className="font-semibold mr-3 text-slate-700">Preço($):</span> {data.overview.price}</p>
                <p className="flex flex-col my-2 text-slate-600">
                    <span className="font-semibold text-slate-700">Overview:</span> 
                    <p>
                        {data.overview.resume}
                    </p>
                </p>

                <p className="my-2 text-slate-600"><span className="font-semibold mr-3 text-slate-700">Usabilidade:</span> {data.overview.use}</p>
                <p className="my-2 text-slate-600"><span className="font-semibold mr-3 text-slate-700">Links:</span> {data.overview.links}</p>


            </main>

            <footer className="flex justify-end">
                <button onClick={saveTopic} className="bg-default_purple px-6 py-4 rounded text-white">Salvar tópico</button>
            </footer>
        </div>
    )
}