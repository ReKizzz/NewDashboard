import { endpoints } from "../../constants/endpoints";
import { getRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { index } from "./mediaSlice";


export const mediaService = {
    index: async (dispatch, page,params) => {
        const response = await getRequest(`${endpoints.image}?page=${page}&per_page=10`, params);
        await httpServiceHandler(dispatch, response);
        if(response.status === 200) {
            dispatch(index(response.data));
        }
        return response;
    },
}