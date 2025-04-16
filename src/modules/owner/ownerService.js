import { endpoints } from "../../constants/endpoints";
import {
  getRequest,
  postRequest,
  putRequest,
  delRequest,
} from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { updateNotification } from "../../shares/shareSlice";
import { index, show, update } from "./ownerSlice";

export const ownerService = {
  store: async (payload, dispatch) => {
    const response = await postRequest(endpoints.owner, payload);
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

  store2: async (payload, dispatch) => {
    const response = await postRequest(endpoints.contract, payload);
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

  index: async (dispatch, params) => {
    const response = await getRequest(endpoints.owner, params);
    await httpServiceHandler(dispatch, response);

    if (response.status === 200) {
      dispatch(index(response.data.data ? response.data.data : response.data));
    }
    return response;
  },
  corner: async (dispatch, params) => {
    const response = await getRequest(endpoints.corner, params);
    await httpServiceHandler(dispatch, response);

    if (response.status === 200) {
      dispatch(index(response.data.data ? response.data.data : response.data));
    }
    return response;
  },

  update: async (dispatch, id, payload) => {
    const response = await postRequest(`${endpoints.owner}/${id}`, payload);
    await httpServiceHandler(dispatch, response);

    if (response.status === 200) {
      dispatch(update(response.data));
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
    const response = await delRequest(`${endpoints.owner}/${id}`);
    await httpServiceHandler(dispatch, response);

    if (response.status === 200) {
      dispatch(
        updateNotification({
          show: true,
          summary: "Success",
          severity: "success",
          detail: response.message || "Owner deleted successfully",
        })
      );
    }

    return response;
  },

  show: async (dispatch, id) => {
    const response = await getRequest(`${endpoints.owner}/${id}`);
    await httpServiceHandler(dispatch, response);

    if (response.status === 200) {
      dispatch(show(response.data));
    }

    return response;
  },
  show2: async (dispatch, id) => {
    const response = await getRequest(`${endpoints.owner}/${id}/2`);
    await httpServiceHandler(dispatch, response);

    if (response.status === 200) {
      dispatch(show(response.data));
    }

    return response;
  },
};
