const redux = require('redux');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios')

const initialState = {
    loading: false,
    users: [],
    error: ''
}

const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

const actions = {
    FetchUserRequest: () => {
        return {
            type: FETCH_USER_REQUEST
        }
    }, FetchUserSuccess: (users) => {
        return {
            type: FETCH_USER_SUCCESS,
            payload: users
        }
    }, FetchUserFailure: (error) => {
        return {
            type: FETCH_USER_FAILURE,
            payload: error
        }
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
            break;
        case FETCH_USER_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: ''
            }
        case FETCH_USER_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload
            }
        default:
            break;
    }
}

const fetchUsers = () => {
    return function (dispatch) {
        dispatch(actions.FetchUserRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(
                response => {
                    //response.data is tha array of users
                    const users = response.data.map( user => user.id)
                    dispatch(actions.FetchUserSuccess(users))
                }
            )
            .catch(error => {
                //error.menssage is the error description
                dispatch(actions.FetchUserFailure(error.menssage))
            })
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))
const unsubscribe = store.subscribe(()=>{console.log(store.getState())})

store.dispatch(fetchUsers())