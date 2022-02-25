export interface UserInfo {
    id: number,
    name: string,
    age: number,
    phone: string,
    remark?: string
  }
  
  export interface PaperItem {
    _id: string
    paperId: number
    userId: number
    paperName: string
    score: number | string
    flag: Boolean
  }
  
  export interface PaperTableItem {
    key: string
    paperId: number
    paperName: string
    score: number | string
    flag: Boolean
  }
  