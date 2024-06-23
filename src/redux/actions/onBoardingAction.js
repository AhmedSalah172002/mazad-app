import { useGetDataToken } from "../../hooks/useGetData";
import { ON_BOARDING } from "../type";



export const onBoarding = () => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/api/v1/onboarding/account`);
        dispatch({
            type: ON_BOARDING,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: ON_BOARDING,
            payload: e.response,
        })
    }
}
