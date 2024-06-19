import { useInUpdateDataWithImage } from "../../hooks/useUpdateData";
import { UPDATE_LOGGED_USER } from "../type";

export const updateLoggedUser = (data) => async (dispatch) => {
  try {
      const response = await useInUpdateDataWithImage('api/v1/users/updateMe', data);
      dispatch({
          type: UPDATE_LOGGED_USER,
          payload: response,
      })
  } catch (e) {
      dispatch({
          type: UPDATE_LOGGED_USER,
          payload: e.response,
      })
  }
}

