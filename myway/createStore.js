// Will implement just one function - createStore
const createStore = (yourReducer) => {
    // we need a list of listeners (...)
    // someone subscribe, let's add to it
    // it's important because when action is dispatched
    // all the listeners must be notified in a loop
    let listeners = [] 

    // (...) and need the initial state supplied by the reducer
    // calling yourReducer with undefined and empty
    // we will get back initialState
    let currentState = yourReducer(null, {type: "initialState"})

    return {
        // get last state from store
        getState: () => currentState,

        // takes action, 
        dispatch(action) {
            // feeds action and currentState
            // to get a new state, 
            currentState = yourReducer(currentState, action)

            // then dispatch notifies everyone
            // subscribed to the store
            listeners.forEach((listener) => {
                listener()
            })
        },

        // When the store receives an action
        subscribe(newListener) {
            listeners.push(newListener)

            const unsubscribe = () => {
                listeners = listeners
                    .filter((listener) => listener !== newListener)
            }

            // you can call it when you no longer interested
            // in listening to the store's updates
            return unsubscribe
        }
    }
}

module.exports = createStore