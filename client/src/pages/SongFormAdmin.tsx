/* eslint-disable react-hooks/exhaustive-deps */
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import React from "react";
import { findSongByAlbumExtraReducer } from "../slices/extraReducers/appExtraReducer";


export function SongFormAdmin() {
    const appState = useAppSelector(state => state.app);
    const userState = useAppSelector(state => state.user);
    const [search] = useSearchParams();
    const idsearch = Number(search.get('id'));
    const id: number = isNaN(idsearch) ? 0 : idsearch;
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        if (appState.oneAlbum.id == 0 || appState.oneAlbum.id !== id)
            dispatch(findSongByAlbumExtraReducer({ jwt: userState.jwt, id }));
    }, []);


    return (
        <>
            <h2 className="title">Agregar canciones</h2>
            <div className="album_info_cancionform">
                <img src={appState.oneAlbum.urlImage} alt={appState.oneAlbum.title} />
                <h3>{appState.oneAlbum.title}</h3>
            </div>
        </>
    );
}
