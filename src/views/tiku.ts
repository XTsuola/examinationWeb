export interface PaperDataList {
    id: number,
    paperName: string,
    stemArr: number[]
}

export interface OptionsList {
    label: string,
    value: number,
    disabled: boolean
}

export interface DataList {
    index: number
    url: string
    type: number
    id: number
    stem: string
    selectArr?: string[]
    anwser?: string
}

export interface AddObjType {
    url: string
    stem: string
    type: number
    selectArr?: string[]
    anwser: string
    remark?: string
}