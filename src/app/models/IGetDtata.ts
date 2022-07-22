export interface GetData {
    id?: number;
    email: string;
    mobileNumber: string;
    username: string;
    createdDate:Date;
}

export interface CrudAction<T>{
    action:"add" | "update" | "delete";
    data:T; 
}