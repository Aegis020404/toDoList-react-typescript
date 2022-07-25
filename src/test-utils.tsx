import React, {PropsWithChildren} from 'react'
import {render} from '@testing-library/react'
import type {RenderOptions} from '@testing-library/react'
import {configureStore} from '@reduxjs/toolkit'
import type {PreloadedState} from '@reduxjs/toolkit'
import {Provider} from 'react-redux'

import type {index, RootState} from './store/index'

import cardReducer from './store/slices/cards'
import CardSliceReducer from "./store/slices/cards";


interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: PreloadedState<RootState>
    store?: typeof index
}

export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState = {cards: {visible: [
                    {
                        value: 'hello',
                        date: 1,
                        finished: false,
                    }, {
                        value: 'hello',
                        date: 1,
                        finished: false,
                    },

                ], settings: 'All'}},


        store = configureStore({
            reducer: {
                cards:CardSliceReducer
            },
        }),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({children}: PropsWithChildren<{}>): JSX.Element {
        return <Provider store={store}>{children}</Provider>
    }

    // Return an object with the store and all of RTL's query functions
    return {store, ...render(ui, {wrapper: Wrapper, ...renderOptions})}
}