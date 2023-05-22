'use client'

export const checkUserAuthenticated = () => {

    if (typeof window !== 'undefined') {
        // Perform localStorage action
        const userToken = sessionStorage.getItem('token')      
        return !!userToken
    }
    
}