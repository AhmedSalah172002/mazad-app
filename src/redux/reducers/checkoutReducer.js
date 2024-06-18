import { CREATE_ORDER_CARD, CHECK_INSURANCE_PAYMENT } from "../type";

const inital = {
  createOrderCard: [],
  checkInsurancePayment:[],
};
const checkoutReducer = (state = inital, action) => {
  switch (action.type) {
    case CREATE_ORDER_CARD:
      return {
        ...state,
        createOrderCard: action.payload,
      };
    case CHECK_INSURANCE_PAYMENT:
      return {
        ...state,
        checkInsurancePayment: action.payload,
      };
    default:
      return state;
  }
};
export default checkoutReducer;
