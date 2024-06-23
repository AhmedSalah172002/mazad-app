import { ON_BOARDING } from "../type";

const inital = {
  onBoarding: [],
};
const onBoardingReducer = (state = inital, action) => {
  switch (action.type) {
    case ON_BOARDING:
      return {
        ...state,
        onBoarding: action.payload,
      };

    default:
      return state;
  }
};
export default onBoardingReducer;
