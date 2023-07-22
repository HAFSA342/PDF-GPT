import { LOGIN_USER, TOKEN, REMOVE_USER, ADD_USER } from '../types'

const loginReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_USER: {
            return { ...state, user: action.user }
        }
        case TOKEN: {
            return { ...state, token: action.token }
        }
        default: {
            return state
        }
    }
}

export default loginReducer

