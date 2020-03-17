// State lives in a single tree
// The app state looks like this
const initialState = { count: 0 }

// Actions declare state changes
// By Redux convention, I DO NOT directly modify (mutate)
// the state like: state.count = 1

// Instead I create all the actions the user 
// may leverage in the application
const actions = {
    increment: { type: 'INCREMENT' },
    decrement: { type: 'DECREMENT' },
}


// Redux interprets action and updates state
// The last architectural piece calls for a reducer,
// a pure functoin that returns a new copy of your
// state based on the previous state and action
// - if decrement is fired, decrement state.count
// - if increment is fired, increment state.count
const countReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.increment.type:
            return {
                count: state.count + 1
            }

        case actions.decrement.type:
            return {
                count: state.count - 1
            }

        default:
            return state
    }
}

// No Redux so far
// Did you notice that we haven't touched the Redux library yet?
// We've just created some objects and a function.
// This is what I mean by "mostly convention"

// Now, let's implement Redux
// To put this architecture to use, we must plug 
// it into a store. We'll implement jus tone function - createStore
import { createStore } from 'redux'

const store = createStore(countReducer)

store.subscribe(() => {
    console.log(store.getState())
})

store.dispatch(actions.increment)
store.dispatch(actions.increment)
store.dispatch(actions.decrement)