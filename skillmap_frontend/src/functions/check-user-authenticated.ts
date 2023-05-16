export const checkUserAuthenticated = () => {
    const userToken = localStorage.getItem('token')

    return !!userToken
}