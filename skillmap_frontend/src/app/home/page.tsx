'use client'

import CategoryItem from '@/components/Categories/CategoryItem';
import { signOut } from 'next-auth/react';

export default function Home(){

    return(
        <div className='h-screen w-full'>

            <main>
                <h1>Front-end</h1>
                <CategoryItem name='front-end'/>

                <h1>Back-end</h1>
                <CategoryItem name='back-end'/>

                <h1>Design</h1>
                <CategoryItem name='design'/>

                <h1>Quality Assurance</h1>
                <CategoryItem name='quality-assurance'/>
            </main>
            
            
            
            <button onClick={
                ()=>{
                    signOut()
                    sessionStorage.clear()
                }
                }>signOut</button>
        </div>
    )
}