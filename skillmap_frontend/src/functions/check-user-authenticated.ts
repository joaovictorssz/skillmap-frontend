export const checkUserAuthenticated = () => {
    const userToken = sessionStorage.getItem('token')

    return !!userToken
}