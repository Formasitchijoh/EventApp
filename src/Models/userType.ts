
export interface User  {
    Selected:boolean,
    id:number,
    email:string,
    name:string,
    photoUrl:string,
    

}

export interface Admin { 
    email:string,
    password:string,
    photoUrl:string | undefined
}

export interface Event {
    id:string,
    title:string,
    desc:string,
    start_date:string,
    end_date:string,
    start_time:string ,
    end_time:string ,
    participants?:User[]
    
}
