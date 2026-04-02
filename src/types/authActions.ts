export interface authData {
    token: string;
    password: string;
}

export interface logOutData {
    token: string;
    userId: string
}

export interface sUData {
    name: string;
    surname: string;
    pseudo: string;
    email: string;
    password: string;
    confirmPassword: string;
    hp: string;

}

export interface sIData {
    email: string;
    password: string;
}