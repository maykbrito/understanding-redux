const createStore = require('./createStore')

const initialState = { count: 0 }

const countActions = {
    increment: state => ({ count: state.count + 1 }),
    decrement: state => ({ count: state.count - 1 }),
    initialState: () => ({ count: initialState.count })
}

const countReducer = (state, action) => {
    return countActions[action.type](state)
}

const store = createStore(countReducer)

store.subscribe(() => {
    console.log(store.getState())
})

store.dispatch({type: 'increment'})
store.dispatch({type: 'increment'})
store.dispatch({type: 'decrement'})