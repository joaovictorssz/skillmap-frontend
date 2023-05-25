'use client'
import { getVideosByKeyword } from '@/functions/youtube-api';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default  function VideoList({theme}: {theme: string}){

    const [videos, setVideos] = useState<any>([])
    const {push} = useRouter()

    useEffect(()=>{
        async function fetchVideos() {
            const keyword = theme;
            const videoUrls = await getVideosByKeyword(keyword);
            setVideos(videoUrls);

        }

        fetchVideos()
    }, [])

    useEffect(()=>{
        console.log(videos)
    }, [videos])


    return(
        <div className="p-10">
            Aqui está uma lista de vídeos que podem te ajudar:

            {videos?.items! ? videos?.items?.map((item: any, number: number)=>{
                return (
                    <div key={number} onClick={()=>{push(`https://www.youtube.com/watch?v=${item.id.videoId}`)}} className="flex rounded overflow-hidden transition-colors border hover:border-default_purple items-center bg-slate-100 cursor-pointer w-2/3 my-4">
                        <section>
                            <img className="rounded-l-md" src={item.snippet.thumbnails.default.url}></img>
                        </section>
                        <section className="ml-4 bg-slate-100">
                            <p>{item.snippet.title}</p>
                            <p>{item.snippet.channelTitle}</p>
                        </section>
                    </div>
                )
            }) : null}
        </div>
    )
}