export interface newTData {
    token : string
    title : string
    description : string
}

export interface tTData {
    title: string
}

export interface lockTData {
    token : string
    id : string
    isLocked : boolean
}

export interface editTData {
    token : string
    id : string
    title : string
    description : string
}