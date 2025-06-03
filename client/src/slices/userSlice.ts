import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { userExtraReducer } from "./extraReducers/userExtraReducer";
import { loginstorage } from "../utils/loginstorage";

const initialState: UserInitialState = {
    jwt: loginstorage.read(),
    userinfo: {
        username: "",
        nickname: "",
        urlImage: ""
    },
    message: ""
}

const userSlice = createSlice({
    name: 'slice/user',
    initialState,
    reducers: {
        writeMessage(state, action: PayloadAction<{ message: string }>) {
            state.message = action.payload.message;
        },
        logout(state) {
            state.jwt = '';
            state.userinfo = {
                username: "",
                nickname: "",
                urlImage: ""
            }
            loginstorage.save('');
        }
    },
    extraReducers: userExtraReducer
});



export const userAction = userSlice.actions;
export const userReducer = userSlice.reducer;