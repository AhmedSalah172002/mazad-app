import { useInsertData } from "../../hooks/useInsertData";
import {
  CREATE_CATEGORY,
  GET_ALL_CATEGORY,
  GET_CATEGORY_DETAILS,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
} from "../type";
import { useGetData } from "../../hooks/useGetData";
import useDeleteData from "../../hooks/useDeleteData";

import { useInsUpdateData } from "../../hooks/useUpdateData";

//create category with pagination
export const createCategory = (formatData) => async (dispatch) => {
  try {
    const response = await useInsertData("/api/v1/category", formatData);

    dispatch({
      type: CREATE_CATEGORY,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: CREATE_CATEGORY,
      payload: e.response,
    });
  }
};

//get all category with pagination
export const getAllCategory = () => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/category`);
    dispatch({
      type: GET_ALL_CATEGORY,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ALL_CATEGORY,
      payload: e.response,
    });
  }
};

//get one Category with id
export const getOneCategory = (id) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/category/${id}`);
    dispatch({
      type: GET_CATEGORY_DETAILS,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_CATEGORY_DETAILS,
      payload: e.response,
    });
  }
};

//delete category with id
export const deleteCategory = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/category/${id}`);

    dispatch({
      type: DELETE_CATEGORY,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: DELETE_CATEGORY,
      payload: e.response,
    });
  }
};

//update category with id
export const updateCategory = (id, data) => async (dispatch) => {
  try {
    const response = await useInsUpdateData(`/api/v1/category/${id}`, data);
    dispatch({
      type: UPDATE_CATEGORY,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: UPDATE_CATEGORY,
      payload: e.response,
    });
  }
};
