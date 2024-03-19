import { REGISTER, LOGIN_USER, } from '../type'

const inital = {
    register: [],
    loginUser: [],
    loading: true,
}
const authReducer = (state = inital, action) => {
    switch (action.type) {
        case REGISTER:
            return {
                ...state,
                register: action.payload,
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