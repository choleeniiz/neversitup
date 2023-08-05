export interface ITodoReq{
    title : string
    description : string
  }

  export interface ITodo{
    _id : string
    title : string
    description: string
    user_id: string
    createdAt: string
    updatedAt: string
  }