/* eslint-disable react-hooks/exhaustive-deps */
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { AlbumCom } from "../components/AlbumCom";
import React from "react";
import { findOneArtistExtraReducer } from "../slices/extraReducers/appExtraReducer";



export function OneArtist() {
    const [search] = useSearchParams();
    const idsearch = Number(search.get('id'));
    const id: number = isNaN(idsearch) ? 0 : idsearch;
    const appState = useAppSelector(state => state.app);
    const userState = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(findOneArtistExtraReducer({ jwt: userState.jwt, id }));
    }, [userState.jwt]);

    return (
        <>
            <div className="oneartist_info">
                <div className="shadow" style={{backgroundImage:`url(${appState.oneArtist.urlImage})`}}></div>
                <img src={appState.oneArtist.urlImage} alt={appState.oneArtist.name} />
                <h2 className="title">{appState.oneArtist.name}</h2>
            </div>
            <h3 className="title2">Albums</h3>
            <div className="contenedor contenedor_album">
                {appState.albums.map(s => <AlbumCom key={s.id} {...s} />)}
            </div>

        </>
    );
}
