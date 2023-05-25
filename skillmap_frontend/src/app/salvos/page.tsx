'use client'

import { userContext } from '@/contexts/UserContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';

export default function Salvos(){

    const { push } = useRouter()

    const [topics_saved, setTopics_saved] = useState()
    const {user} = useContext(userContext) 
    

    return(
        <div className="p-10">

            <h1>Esses são os tópicos salvos por você:</h1>

            <main>
                {user.topics_saved?.map((topic, id)=>{
                    return (
                        <div onClick={()=>{push(`/topics/${topic.topic_id}`)}} key={id} className=" cursor-pointer w-1/2 my-4 px-10 py-6 bg-slate-100 flex justify-between items-center rounded-lg border border-slate-400">
                            <section>
                                {
                                    topic.title ? topic.title: "Tópico sem nome" 
                                }
                            </section>

                            <section>📝</section>
                        </div>
                    )
                })}
            </main>

        </div>
    )
}