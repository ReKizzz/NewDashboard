import { endpoints } from "../../constants/endpoints";
import { getRequest, postRequest, delRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { updateNotification } from "../../shares/shareSlice";
import { index, show } from "./streetSlice";

export const streetService = {
  index: async (dispatch, params) => {
    const response = await getRequest(endpoints.street, params);
    await httpServiceHandler(dispatch, response);
    if (response.status === 200) {
      dispatch(
        index(response.data.data ? response.data.data : response.data)
      );
    }
    return response;
  },

  store: async (payload, dispatch) => {
    const response = await postRequest(endpoints.street, payload);
    await httpServiceHandler(dispatch, response);

    if (response.status === 200) {
      dispatch(
        updateNotification({
          show: true,
          summary: "Success",
          severity: "success",
          detail: response.message,
        })
      );
    }

    return response;
  },

  show: async (dispatch, id) => {
    const response = await getRequest(`${endpoints.street}/${id}`);
    await httpServiceHandler(dispatch, response);

    if (response.status === 200) {
      response.data.icon = "";
      dispatch(show(response.data))
    }

    return response;
  },

  update: async (dispatch, id, payload) => {
    const response = await postRequest(`${endpoints.street}/${id}`, payload);
    await httpServiceHandler(dispatch, response);

    if (response.status === 200) {
      dispatch(
        updateNotification({
          show: true,
          summary: "Success",
          severity: "success",
          detail: response.message,
        })
      );
    }

    return response;
  },

  delete: async (dispatch, id) => {
    const response = await delRequest(`${endpoints.street}/${id}`);
    await httpServiceHandler(dispatch, response);

    if (response.status === 200) {
      dispatch(
        updateNotification({
          show: true,
          summary: "Success",
          severity: "success",
          detail: response.message,
        })
      );
    }

    return response;
  },

  export: async (dispatch) => {
    const response = await getRequest('/export-street');
    await httpServiceHandler(dispatch,response);

    if (response.status === 200) {
      dispatch(
        updateNotification({
          show: true,
          summary: "Success",
          severity: "success",
          detail: response.message,
        })
      );
    }

    return response;
  }
};
