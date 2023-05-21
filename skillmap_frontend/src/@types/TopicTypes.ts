export interface TopicTypes{
    category: string,
    name: string,
    img: any,
    overview: {
        creators: string,
        creation_date: string,
        price: string,
        resume: string,
        use: string,
        links: string
    };
    roadmap: {
        steps: {
            name: string
        }[]
    }
}