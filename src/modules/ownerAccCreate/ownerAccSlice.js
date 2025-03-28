import { createSlice } from "@reduxjs/toolkit";
import { ownerAccPayload } from "./ownerAccPayload";

const ownerAccSlice = createSlice({
    name: 'ownerAcc',
    initialState: {
        ownerAcc: [],
        mainownerAcc: null,
        subownerAcc: [],
        subownerAcc: null,
        ownerAccPaginateParams: ownerAccPayload.ownerAccPaginateParams,
    },
    reducers: {
        index: (state, action) => {
            state.ownerAcc = action.payload;
            return state;
        },
        update: (state, action) => {
            state.ownerAcc = action.payload;
            return state;
        },
        show:( state,action) => {
            state.ownerAcc = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.ownerAccPaginateParams = action.payload;
            return state;
        },
    }
});

export const { 
    index,
    update, 
    show,
    setPaginate,
} = ownerAccSlice.actions;

export default ownerAccSlice.reducer;