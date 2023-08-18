
export interface User  {
    
    id:number,
    email:string,
    password:string,
    photoUrl?:string | undefined

}

export interface Admin {
    email:string,
    password:string,
    photoUrl:string | undefined
}

export interface Event {
    id:number,
    title:string,
}