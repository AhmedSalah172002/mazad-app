import {
  CREATE_CATEGORY,
  GET_ALL_CATEGORY,
  GET_CATEGORY_DETALIS,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
  GET_ERROR,
} from "../type";
const inital = {
  category: [],
  allCategory: [],
  oneCategory: [],
  deleteCategory: [],
  updateCategory: [],
  loading: true,
};
const categoryReducer = (state = inital, action) => {
  switch (action.type) {
    case CREATE_CATEGORY:
      return {
        ...state,
        category: action.payload,
        loading: false,
      };
    case GET_ALL_CATEGORY:
      return {
        ...state,
        allCategory: action.payload,
        loading: false,
      };
    case GET_CATEGORY_DETALIS:
      return {
        oneCategory: action.payload,
        loading: false,
      };

    case DELETE_CATEGORY:
      return {
        ...state,
        deleteCategory: action.payload,
        loading: false,
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        updateCategory: action.payload,
        loading: false,
      };

    case GET_ERROR:
      return {
        loading: true,
        category: action.payload,
      };
    default:
      return state;
  }
};
export default categoryReducer;
