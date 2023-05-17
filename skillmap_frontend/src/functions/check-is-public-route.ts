import { Routes } from "@/routes/routes"

export const checkIsPublicRoute = (asPath: string)=>{
    const publicRoutes = Object.values(Routes.public)
    return asPath.includes('create') ? publicRoutes.some(value => value.includes('create')) : publicRoutes.includes(asPath)
}