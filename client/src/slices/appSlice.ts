import { createSlice } from "@reduxjs/toolkit";
import { appExtraReducer, initialStateApp } from "./extraReducers/appExtraReducer";


const appSlice = createSlice({
    name:'slice/app',
    initialState:initialStateApp,
    reducers:{},
    extraReducers:appExtraReducer
});

export const appActions = appSlice.actions;
export const appReducer = appSlice.reducer;