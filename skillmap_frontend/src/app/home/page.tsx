'use client'

import CategoryItem from '@/components/Categories/CategoryItem';
import { signOut } from 'next-auth/react';

export default function Home(){

    return(
        <div className='h-screen w-full'>

            <main className='p-10'>
                <h1 className='italic text-default_purple'>Front-end</h1>
                <CategoryItem name='front-end'/>

                <h1 className='italic text-default_purple'>Back-end</h1>
                <CategoryItem name='back-end'/>

                <h1 className='italic text-default_purple'>Design</h1>
                <CategoryItem name='design'/>

                <h1 className='italic text-default_purple'>Quality Assurance</h1>
                <CategoryItem name='quality-assurance'/>
            </main>
            
            
            
           
        </div>
    )
}