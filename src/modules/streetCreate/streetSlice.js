import { createSlice } from "@reduxjs/toolkit";
import { streetPayload } from "./streetPayload";

const streetSlice = createSlice({
    name: 'discount',
    initialState: {
        owners: [],
        owner: null,
        paginateParams : streetPayload.streetPaginateParams,
        total : 0
    },
    reducers: {
        index: (state, action) => {
            state.owners = action.payload;
            return state;
        },
        update: (state, action) => {
            state.owner = action.payload;
            return state;
        },
        show: (state, action) => {
            state.owner = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        }
    }
});

export const { index, update, show, setPaginate } = streetSlice.actions;
export default streetSlice.reducer;