const redux = require('redux');

const createStore = redux.createStore;

const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';

function buyCake() {

}

const actions = {
    buyCake: () => {
        return {
            type: BUY_CAKE,
            info: 'Buy cake'
        }
    },
    buyIceCream: () => {
        return {
            type: BUY_ICECREAM,
            info: 'Buy icecream'
        }
    }
}

//Reducer = (previousState, action) => State

const initialState = {
    numOfCakes: 10,
    numOfIceCream: 20
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case BUY_CAKE: return {
            ...state,
            numOfCakes: state.numOfCakes - 1
        }
            break;
        case BUY_ICECREAM: return {
            ...state,
            numOfIceCream: state.numOfIceCream - 1
        }

            break;
        default: return state
    }
}

const store = createStore(reducer);

console.log('Initial state', store.getState());
const unsubscribe = store.subscribe(() => console.log(`Update state`, store.getState()))
store.dispatch(actions.buyCake())
store.dispatch(actions.buyIceCream())
store.dispatch(actions.buyCake())

unsubscribe();