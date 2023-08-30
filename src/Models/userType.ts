
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
    id:number,
    title:string,
    desc:string,
    start_date:Date,
    end_date:Date,
    start_time:Date,
    end_time:Date,
    participants?:User[]
    
}
