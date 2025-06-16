/* eslint-disable react-hooks/exhaustive-deps */


import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { findOneCategory } from "../slices/extraReducers/appExtraReducer";
import { Navigate, useSearchParams } from "react-router-dom";
import { routesname } from "../routes/routesname";
import { AlbumCom } from "../components/AlbumCom";
import '../styles/onecategory.scss';
import { CategoryCom } from "../components/CategoryCom";

export function OneCategory() {
    const appState = useAppSelector(state => state.app);
    const userState = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const [search] = useSearchParams();
    const idsearch = Number(search.get('id'));
    const id: number = isNaN(idsearch) ? 0 : idsearch;

    React.useEffect(() => {
        dispatch(findOneCategory({ jwt: userState.jwt, id }));
    }, [userState.jwt]);
    if (id === 0)
        return <Navigate to={routesname.home} />

     if(appState.loading) return <div className="loading"></div>

    return (
        <>
            <div className="oneartist_info">
                <div className="shadow" style={{ backgroundImage: `url(${appState.oneCategory.urlImage})` }}></div>
                <img src={appState.oneCategory.urlImage} alt={appState.oneCategory.title} />
                <h2 className="title">{appState.oneCategory.title}</h2>
            </div>

            <h3 className="title2">Albums</h3>
            <div className="contenedor contenedor_album">
                {appState.albums.map(s => <AlbumCom key={s.id} {...s} />)}
            </div>
            <h3 className="title3">Artista</h3>
            <div className="contenedor contenedor_list">
                {appState.artists.map(c => (<CategoryCom
                    option={"artist"}
                    key={c.id}
                    id={c.id}
                    urlImage={c.urlImage}
                    title={c.name}
                    pathbase={routesname.oneartist}
                />))}
            </div>
        </>
    );
}
