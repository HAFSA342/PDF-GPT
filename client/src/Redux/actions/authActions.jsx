import { LOGIN_USER, REMOVE_USER, ADD_USER, TOKEN } from '../types'

const loginUser = (user) => {
    return {
        type: LOGIN_USER,
        user: user
    }
}

const removeUser = (user) => {
    return {
        type: REMOVE_USER,
        user: user
    }
}

const authToken = (token) => {
    return {
        type: TOKEN,
        token
    }
}

export {
    loginUser,
    removeUser,
    authToken
}