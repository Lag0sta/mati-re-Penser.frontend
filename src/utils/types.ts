export interface authData {
    token ?: string;
    name ?: string;
    surname ?: string;
    pseudo ?: string;
    email ?: string;
    password ?: string;
    confirmPassword ?: string;
}

export interface profilData{
    token ?: string;
    style ?: string;
    seed ?: string;
}

export interface threadData {
    token ?: string
    title ?: string
    newComment ?: string
}

export interface topicData {
    token ?: string
    id ?: string
    title ?: string
    description ?: string
    isLocked ?: boolean
}