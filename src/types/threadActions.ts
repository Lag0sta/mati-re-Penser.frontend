export interface addCData {
    token : string
    title : string
    newComment : string
    quote : string[];
}

export interface editCData {
    id : string
    token : string
    text : string
}

export interface deleteCData {
    id : string
    token : string
    pseudo : string 
    password : string
}