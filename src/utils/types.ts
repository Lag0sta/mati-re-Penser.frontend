export interface authData {
    token ?: string;
    name ?: string;
    surname ?: string;
    pseudo ?: string;
    email ?: string;
    password ?: string;
    confirmPassword ?: string;
    hp ?: string;
    userId ?: string
}

export interface profilData{
    token ?: string;
    style ?: string;
    seed ?: string;
}

export interface threadData {
    id ?: string
    token ?: string
    title ?: string
    newComment ?: string
    text ?: string
    quote ?: string[];
}

export interface topicData {
    token ?: string
    id ?: string
    title ?: string
    description ?: string
    isLocked ?: boolean
}

export interface reviewData {
    name ?: string
    title ?: string
    text ?: string
    rating ?: number
}