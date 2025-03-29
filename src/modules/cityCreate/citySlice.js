import { createSlice } from "@reduxjs/toolkit";
import { cityPayload } from "./cityPayload";

const citySlice = createSlice({
    name: 'discount',
    initialState: {
        owners: [],
        owner: null,
        paginateParams : cityPayload.cityPaginateParams,
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

export const { index, update, show, setPaginate } = citySlice.actions;
export default citySlice.reducer;