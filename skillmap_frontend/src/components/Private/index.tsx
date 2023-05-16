'use client'

import { checkUserAuthenticated } from "@/functions/check-user-authenticated";
import { Routes } from "@/routes/routes";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export const PrivateRoute = ({children}:{children: ReactNode}) =>{
    const { push } = useRouter()

    const isUserAuthenticated = checkUserAuthenticated()

    useEffect(()=>{
        if(!isUserAuthenticated){
            push(Routes.public.login)
        }
    }, [isUserAuthenticated, push])

    return (
        <>
        
            {!isUserAuthenticated && null}
            {isUserAuthenticated && children}

        </>
    )

}