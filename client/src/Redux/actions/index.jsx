import { loginUser, removeUser } from './authActions'

const reduxActions = (dispatch) => {
    return {
        loginUser: (e) => dispatch(loginUser(e)),
        removeUser: () => dispatch(removeUser())
    }
}


export default reduxActions