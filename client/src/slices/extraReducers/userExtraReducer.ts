/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, type ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { loginstorage } from "../../utils/loginstorage";



export const urlbase = import.meta.env.DEV?'http://localhost:3007/api':`${window.location.origin}/api`;

export const loginExtrareducer = createAsyncThunk(
    'extrareducer/login',
    async (data: LoginDto): Promise<{ jwt: string }> => {
        try {
            const ft = await fetch(`${urlbase}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            //ft.ok -> true si ft.status < 300 y ft.ok -> false si ft.status >= 300
            if(!ft.ok){
                const errorDto = await ft.json() as ErrorDto;
                throw {message:errorDto.message}
            }
            return ft.json();
        } catch (error) {
            const {message} = error as {message:string};
            throw {message};
        }
    }
);

export const registerExtraReducer = createAsyncThunk(
    'extrareducer/register',
    async (data:RegisterDto):Promise<{jwt:string}>=>{
        try {
            const ft = await fetch(`${urlbase}/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            //ft.ok -> true si ft.status < 300 y ft.ok -> false si ft.status >= 300
            if(!ft.ok){
                const errorDto = await ft.json() as ErrorDto;
                throw {message:errorDto.message}
            }
            return ft.json();
        } catch (error) {
            const {message} = error as {message:string};
            throw {message};
        }
    }
);

export const viewuserinfoExtraReducer = createAsyncThunk(
    'extrareducer/viewuserinfo',
    async ({jwt}:{jwt:string}):Promise<UserInfo>=>{
        const ft = await fetch(`${urlbase}/user/viewuserinfo`, {
            method:'GET',
            headers:{
                'Authorization':`Bearer ${jwt}`
            }
        });
        if(ft.status === 403)
            throw {message:'jwt'};
        if(!ft.ok)
            throw {message:'error en obtener informacion'};
        return ft.json();
    }
);

export const updateperfilpictureExtraReducer = createAsyncThunk(
    'extrareducer/updateperfilpicture',
    async ({jwt, formdata}:{jwt:string, formdata:FormData}):Promise<UserInfo>=>{
         const ft = await fetch(`${urlbase}/user/addimageprefile`, {
            method:'POST',
            headers:{
                'Authorization':`Bearer ${jwt}`
            },
            body:formdata
        });
        if(!ft.ok)
            throw {message:'error en obtener informacion'};
        return ft.json();
    }
);

export function userExtraReducer(builder:ActionReducerMapBuilder<UserInitialState>){
    builder.addCase(loginExtrareducer.fulfilled, (state, action)=>{
        state.jwt = action.payload.jwt;
        loginstorage.save(action.payload.jwt);
        state.message = '';
    }); 
    builder.addCase(loginExtrareducer.rejected, (state, action)=>{
        state.message = action.error.message ?? 'Error en el login';
        loginstorage.save('');
    });
    builder.addCase(registerExtraReducer.fulfilled, (state, action)=>{
        state.jwt = action.payload.jwt;
        loginstorage.save(action.payload.jwt);
        state.message = '';
    });
    builder.addCase(registerExtraReducer.rejected, (state, action)=>{
        state.message = action.error.message ?? 'Error al registrar';
    });
    builder.addCase(viewuserinfoExtraReducer.fulfilled, (state, action)=>{
        state.userinfo = action.payload;
    });
    builder.addCase(viewuserinfoExtraReducer.rejected, (state, action)=>{
        if(action.error.message == 'jwt'){
            state.jwt = '';
            loginstorage.save('');
        }
    });
    builder.addCase(updateperfilpictureExtraReducer.fulfilled, (state, action)=>{
        state.userinfo = action.payload;
    });
}