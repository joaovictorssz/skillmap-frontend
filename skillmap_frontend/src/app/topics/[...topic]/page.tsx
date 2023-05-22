'use client'

import { TopicTypes } from "@/@types/TopicTypes"
import Overview from "@/components/Topics/Overview/page"
import Roadmap from "@/components/Topics/Roadmap/page"
import VideoList from "@/components/Topics/VideoList/page"
import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Topic(){

    const params = useParams()
    const  [topic, setTopic] = useState<TopicTypes>({
        category:  '',
        img:  '',
        name: '',
        overview: {
            creation_date:'',
            creators: '',
            links: '',
            price:  '',
            resume: '',
            use: ''
        },
        roadmap: {steps: [{name: ''}]}
    })
    const [section, setSection] = useState<string>('overview')

    console.log(params!.topic)

    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_API}/topics/${params!.topic}`)
        .then((res)=>{
            console.log(res.data)
            setTopic(res.data)
        })
    }, [])

    return(
        <div>

            <nav className="w-full flex justify-center">
                <div className="w-1/2 flex justify-around text-slate-400 text-lg font-semibold">
                    <button className={`${section === 'overview' ?  'text-default_purple' : ''}`} onClick={()=>setSection('overview')}>Overview</button>
                    <button className={`${section === 'roadmap' ?  'text-default_purple' : ''}`} onClick={()=>setSection('roadmap')}>Roadmap</button>
                    <button className={`${section === 'video_list' ?  'text-default_purple' : ''}`} onClick={()=>setSection('video_list')}>Lista de vídeos</button>
                </div>
            </nav>
            
            <main>

            {section === 'overview' && <Overview data={topic}/>}
            {section === 'roadmap' && <Roadmap data={topic.roadmap}/>}
            {section === 'video_list' && <VideoList/>}

            </main>

        </div>
    )

}