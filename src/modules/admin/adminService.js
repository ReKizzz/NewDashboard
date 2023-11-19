import { endpoints } from "../../constants/endpoints"
import { getRequest, postRequest } from "../../helpers/api"
import { httpServiceHandler } from "../../helpers/handler";
import { updateNotification } from "../../shares/shareSlice";
import { index } from "./adminSlice";

export const adminService = {
    store: async (payload, dispatch) => {
        const response = await postRequest(endpoints.admin, payload);
        await httpServiceHandler(dispatch, response);

        if(response.status === 200) {
            dispatch(updateNotification( {
                show: true,
                summary: "Success",
                severity: "success",
                detail: response.message
            }));
        }

        return response;
    },
    index: async (dispatch, params) => {
        const response = await getRequest(endpoints.admin, params);
        await httpServiceHandler(dispatch, response);
        if(response.status === 200) {
            dispatch(index(response.data));
        }
        return response;
    }
}