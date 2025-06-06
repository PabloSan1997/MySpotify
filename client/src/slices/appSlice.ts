import { createSlice } from "@reduxjs/toolkit";
import { appExtraReducer, initialStateApp } from "./extraReducers/appExtraReducer";


const appSlice = createSlice({
    name:'slice/app',
    initialState:initialStateApp,
    reducers:{
        nextSong(state){
            const totalSongs = state.songs.length;
            const onesong = state.onesong;
            const index = state.songs.findIndex(s => s.id == onesong.id);
            if(onesong.id == 0 && totalSongs>0){
                state.onesong = state.songs[0];
            }else if(totalSongs>1 && index>-1){
                const nextindex = totalSongs===(index+1)?0:(index + 1);
                state.onesong = state.songs[nextindex];
            }
               
        }
    },
    extraReducers:appExtraReducer
});

export const appActions = appSlice.actions;
export const appReducer = appSlice.reducer;