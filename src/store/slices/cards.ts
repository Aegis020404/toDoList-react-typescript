import {ICards} from "../../models";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const str:string = localStorage.getItem('visible') || ''

const initialState: ICards = {
    visible: str ? JSON.parse( str ) : [],
    settings: 'All'
}





export const CardSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<{ value: string, date: number }>): void {
            state.visible.push({
                value: action.payload.value,
                date: action.payload.date,
                finished: false
            })
        },
        toggleFinished(state, action: PayloadAction<number>) {
            return {
                ...state,
                visible: state.visible.map((el) => el.date  === action.payload ? {...el, finished: !el.finished} : el)
            }
        },
        deleteItem(state, action: PayloadAction<number>) {
            return {...state, visible: state.visible.filter((el, idx) => idx !== action.payload)}
        },
        filterItems(state,action:PayloadAction<string>) {
            return {...state, settings: action.payload}
        },
        ClearCompleted(state) {
            return {...state, visible: state.visible.filter(el => !el.finished) }
        },

    }
})

export default CardSlice.reducer