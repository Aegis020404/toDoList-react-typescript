import {renderWithProviders} from "../test-utils";
import Cards from "./Cards";

test('Uses preloaded state to render', () => {
    const initialTodos = [{ id: 5, text: 'Buy Milk', completed: false }]

    const { getByText } = renderWithProviders(<Cards />, {
        preloadedState: {cards: {visible: [
                    {
                        value: 'hello',
                        date: 1,
                        finished: false,
                    }, {
                        value: 'hello',
                        date: 1,
                        finished: false,
                    },

                ], settings: 'All'}}
    })
})


