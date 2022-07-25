export interface ICard  {
    value: string
    date: number
    finished: boolean
}

export interface ICards {
    visible: ICard[]
    settings: string
}