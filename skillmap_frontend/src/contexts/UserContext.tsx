import { UserTypes } from "@/@types/UserTypes";
import { createContext } from "react";

type UserContextTypes = {
    user: UserTypes,
    configUser: (user: UserTypes) => void
}

export const userContext = createContext<UserContextTypes>({
    user: {
        birth_date: '',
        e_mail: '',
        last_name: '',
        name: '',
        password:'',
        phone_number: ''
    },
    configUser: ()=>{}
})