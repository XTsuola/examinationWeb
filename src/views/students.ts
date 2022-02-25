export interface Paper {
    paperId: number
    paperName: string
}

export interface StudentTableItem {
    id: number
    account: string
    password: string
    name: string
    age: number
    phone: string
    paperList: Paper[]
    paperStr: string
}

export interface PaperType {
    paperId: number
    paperName: string
    score: string
}
export interface StundentDataList {
    account: string
    age: number
    id: number
    name: string
    paperList: PaperType[]
    password: string
    phone: string
    remark: string
}

export interface ReportType {
    flag: boolean
    paperId: number
    paperName: string
    score: string
    userId: number
    _id: string
}
export interface PaperTableItem {
    id: number,
    paperName: string
}

export interface PaperDataList {
    _id: string,
    stemArr: string[],
    id: number,
    paperName: string
}

export interface itemType {
    id: number
    paperName: string
    stemArr: number[]
    _id: string
}

export interface optionsList {
    label: string,
    value: number,
    disabled: boolean
}

export interface StudentInfo {
    account: string
    password: string
    name: string
    age: string
    phone: string
    remark: string
}

export interface StudentPaperItem {
    id: string
    userId: number
    paperId: number
    paperName: string
    score: string
}