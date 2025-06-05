/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch, useAppSelector } from "../hooks";
import { YourOneSong } from "./YourOneSong";
import '../styles/yoursong.scss';
import React from "react";
import { findSongsExtraReducer } from "../slices/extraReducers/appExtraReducer";

export function YourSongs() {
    const jwt = useAppSelector(state => state.user.jwt);
    const appState = useAppSelector(state => state.app);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        if (appState.songs.length == 0)
            dispatch(findSongsExtraReducer({ jwt }));
    }, [appState.songs.length]);

    return (
        <>
            <h2 className="title_songs">Tus musica</h2>
            <div className="contenedor_yoursong">
                {appState.songs.map(p => <YourOneSong key={p.id} {...p} />)}
            </div>
        </>
    );
}
