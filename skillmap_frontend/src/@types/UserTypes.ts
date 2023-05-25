export interface UserTypes {
    _id: string
    name: string,
    last_name: string,
    e_mail: string,
    phone_number: string,
    birth_date: string,
    password: string,
    admin?: string | boolean,
    topics_saved:{
        topic_id: string,
        title: string
    }[],
    questionaries_saved: {
        questionary_id: string,
    }[],
    history:{
        questionary_id: string,
        pontuation: number | string,
        title: string
    }[]


}