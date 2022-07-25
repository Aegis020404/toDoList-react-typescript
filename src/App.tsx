import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {CardSlice} from "./store/slices/cards";
import {ICard} from "./models";
// @ts-ignore
import trash from './img/trash.png'
import Filter from "./components/Filter";
import cl from './styles/App.module.css'

function App() {
    const [value, setValue] = useState('')
    const input: React.LegacyRef<HTMLInputElement> | undefined = React.createRef()

    const {visible, settings} = useAppSelector(state => state.cards)
    const cards = settings === 'All' ?
        visible : settings === 'Active' ?
            visible.filter(el => !el.finished) :
            visible.filter(el => el.finished)

    useEffect(()=>{  localStorage.setItem('visible', JSON.stringify(visible)) },[visible])
    const dispatch = useAppDispatch()
    const addItem = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (input?.current) input.current.focus()
        if (!value) return
        await dispatch(CardSlice.actions.addItem({value, date: Date.now()}))
        setValue('')
    }

    const getDateS = (date: number) => {
        const dateT = new Date(date)
            , hours = ('' + dateT.getHours()).length === 2 ? dateT.getHours() : '0' + dateT.getHours()
            , minutes = ('' + dateT.getMinutes()).length === 2 ? dateT.getMinutes() : '0' + dateT.getMinutes()
        return `${hours}: ${minutes}`
    }


    return (
        <div className={cl.App}>
            <form className={cl.controls} onSubmit={addItem}>
                <h1 className={cl.title}>To Do List</h1>
                <input className={cl.input} ref={input} type="text" value={value} autoFocus={true}
                       onChange={(e) => setValue(e.target.value)}/>
                <br/>
                <button className={cl.btn} disabled={!value} type='submit'>Добавить</button>
                <div className={cl.count}>Общее колличество: {visible.length}</div>
                <div className={cl.item +' '+ cl.destroy} onClick={async () => {
                    await dispatch(CardSlice.actions.ClearCompleted())
                }}>Clear Completed</div>
            </form>

            {visible.length ? <Filter/> :  <h2 className={cl.title}> Заметок нет</h2> }
            <ul className={cl.cards}>
                {cards.map((el: ICard, idx: number) =>
                    <li key={idx}
                        className={el.finished ? cl.card + ' ' + cl.strike : cl.card}
                        onClick={async () => {
                            await dispatch(CardSlice.actions.toggleFinished(el.date))
                        }}>
                        <span className={cl.imageWrap} onClick={async (e) => {
                            e.stopPropagation();
                            await dispatch(CardSlice.actions.deleteItem(idx))
                        }}>
                            <img src={trash} alt="удалить"/>
                        </span>
                        <div className={cl.value}>{el.value}</div>
                        <div> {getDateS(el.date)} </div>
                    </li>)}
            </ul>
        </div>
    );
}

export default App;
