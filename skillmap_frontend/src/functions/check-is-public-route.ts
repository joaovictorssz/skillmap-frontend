import { Routes } from "@/routes/routes"

export const checkIsPublicRoute = (asPath: string)=>{
    const publicRoutes = Object.values(Routes.public)

    return publicRoutes.includes(asPath)
}