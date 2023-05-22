export interface  QuestionaryTypes{
    name:  string,
    difficult:  string,
    category:  string,
    questions: {
        description: string,
        alternatives:{
            title: string
        }[],
        answer:  string
    }[]
}