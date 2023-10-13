import { GET_ALL_ORDER, GET_ONE_ORDER,GET_ALL_ORDER_TO_USER } from '../type'

const inital = {
    getAllOrders: [],
    AllOrders:[],
    getOneOrder: [],
}
const orderReducer = (state = inital, action) => {
    switch (action.type) {
        case GET_ALL_ORDER:
            return {
                ...state,
                getAllOrders: action.payload,
            }
            case GET_ALL_ORDER_TO_USER:
                return {
                    ...state,
                    AllOrders: action.payload,
                }
        case GET_ONE_ORDER:
            return {
                ...state,
                getOneOrder: action.payload,
            }
        default:
            return state;
    }
}
export default orderReducer