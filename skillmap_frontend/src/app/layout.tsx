'use client'

import { checkIsPublicRoute } from '@/functions/check-is-public-route'
import './globals.css'
import { Inter } from 'next/font/google'
import {usePathname} from 'next/navigation'
import { PrivateRoute } from '@/components/Private'
import { Toaster } from 'react-hot-toast'
import ProvidersWrapper from '@/components/SessionWrapper/page'
import Topbar from '@/components/Topbar'
import { userContext } from './../contexts/UserContext';
import { useEffect, useState } from 'react'
import { UserTypes } from '@/@types/UserTypes'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [user, setUser] = useState<UserTypes>({
    birth_date: '',
    e_mail: '',
    last_name: '',
    name: '',
    password: '',
    phone_number: '',
    history: [{pontuation:0, questionary_id: '', title:''}],
    _id: '',
    questionaries_saved: [{questionary_id:''}],
    topics_saved: [{title:'', topic_id: ''}],
    admin: ''
  })
  const isPublicPage = checkIsPublicRoute(pathname!)

  useEffect(()=>{
    console.log(user)
  }, [user])

  useEffect(()=>{
    sessionStorage.getItem("user") ? setUser(JSON.parse(`${sessionStorage.getItem("user")}`)) : setUser({
      birth_date: '',
    e_mail: '',
    last_name: '',
    name: '',
    password: '',
    phone_number: '',
    history: [{pontuation:0, questionary_id: '', title:''}],
    _id: '',
    questionaries_saved: [{questionary_id:''}],
    topics_saved: [{title:'', topic_id: ''}],
    admin: ''
    })
    console.log(user)
  }, [])

  return (
    <html lang="en">
      <body className={inter.className}>
      <userContext.Provider value={{user: user, configUser: setUser}}>
        <ProvidersWrapper>
          <div>
            <Toaster/>
            {isPublicPage && children}

            {!isPublicPage && 
            
              <PrivateRoute>
              <>
                <Topbar/>
                <main className='mt-36'>
                {children}
                </main>
              </>
            </PrivateRoute>
            
            }
          </div>
        </ProvidersWrapper>
        </userContext.Provider>
      </body>
    </html>
  )
}
