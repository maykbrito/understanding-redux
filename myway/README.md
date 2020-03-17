# My Way Of Doing This
I will modify somethings to make shure that I'm  understanting


## State

State lives in a single tree. The app state looks like this

```js
const initialState = { count: 0 }
```

## Actions

Will do some actions

```js
const countActions = {
    increment: state => ({ count: state.count + 1 }),
    decrement: state => ({ count: state.count - 1 }),
    initialState: _ => ({ count: initialState.count })
}
```

## Reducer

Will call actions, and mutate state

```js
const countReducer = (state, action) => {
    return countActions[action](state)
}
```

## No Redux so far ...
Now, let's implement Redux.

Will implement just one function - createStore

```js
const createStore = (yourReducer) => {
    // we need a list of listeners (...)
    // someone subscribe, let's add to it
    // it's important because when action is dispatched
    // all the listeners must be notified in a loop
    let listeners = [] 

    // (...) and need the initial state supplied by the reducer
    // calling yourReducer with undefined and empty
    // we will get back initialState
    let currentState = yourReducer(null, "initialState")

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
```


## Using it

```js
const store = createStore(countReducer)

store.subscribe(() => {
    console.log(store.getState())
})

store.dispatch('increment')
store.dispatch('increment')
store.dispatch('decrement')
```