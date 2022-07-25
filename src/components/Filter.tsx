import React from 'react';
import cl from '../styles/Filter.module.css'
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {CardSlice} from "../store/slices/cards";

const Filter = () => {
    const dispatch = useAppDispatch()
    const {settings} = useAppSelector(state => state.cards)

    const toggleClass = (value:string) => value === settings ? cl.active : cl.item
    return (
        <div className={cl.items} onClick={async (e:React.SyntheticEvent<EventTarget>) => {
            if (!(e.target instanceof HTMLDivElement)) return

            if (!e.target.dataset.value) return false
            await dispatch(CardSlice.actions.filterItems(e.target.dataset.value))

        }}>

            <div data-value="All" className={toggleClass('All')}> All</div>
            <div data-value="Active" className={toggleClass('Active')}> Active</div>
            <div data-value="Completed" className={toggleClass('Completed')}>Completed</div>
        </div>
    );
};

export default Filter;