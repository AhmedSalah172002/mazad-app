import { CREATE_NEW_USER, LOGIN_USER, } from '../type'

const inital = {
    createUser: [],
    loginUser: [],
    loading: true,
}
const authReducer = (state = inital, action) => {
    switch (action.type) {
        case CREATE_NEW_USER:
            return {
                ...state,
                createUser: action.payload,
            }
        case LOGIN_USER:
            return {
                ...state,
                loginUser: action.payload,
            }
        default:
            return state;
    }
}
export default authReducer