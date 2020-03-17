const createStore = require('./createStore')

const initialState = { todos: [] }

const todosActions = {
    add: (state, action) => ({ todos: state.todos.concat([action.text]) }),
    initialState: () => initialState
}

const todos = (state, action) => {
    return todosActions[action.type](state, action)
}

const store = createStore(todos)

store.subscribe(() => {
    console.log(store.getState())
})

store.dispatch({
    type: 'add', 
    text: "Something"
})

store.dispatch({
    type: 'add', 
    text: "More thing"
})