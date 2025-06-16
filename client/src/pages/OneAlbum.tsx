/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { findSongByAlbumExtraReducer } from "../slices/extraReducers/appExtraReducer";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { SongComp } from "../components/SongComp";
import '../styles/song.scss';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { routesname } from "../routes/routesname";

export function OneAlbum() {
    const appState = useAppSelector(state => state.app);
    const userState = useAppSelector(state => state.user);
    const jwt = useAppSelector(state => state.user.jwt);
    const [search] = useSearchParams();
    const idsearch = Number(search.get('id'));
    const id: number = isNaN(idsearch) ? 0 : idsearch;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    React.useEffect(() => {
        dispatch(findSongByAlbumExtraReducer({ jwt, id }));
    }, [jwt]);

    if(appState.loading) return <div className="loading"></div>
    return (
        <>
            <div className="oneartist_info">
                {userState.isAdmin && <Link to={`${routesname.adminsongs}?id=${appState.oneAlbum.id}`} className="area_add_icon"><PlusCircleIcon className="add_icon"/></Link>}
                <div className="shadow" style={{ backgroundImage: `url(${appState.oneAlbum.urlImage})` }}></div>
                <img src={appState.oneAlbum.urlImage} alt={appState.oneAlbum.title} />
                <div className="area_info">
                    <h2 className="title">{appState.oneAlbum.title}</h2>
                    <h3>Artists: {appState.oneAlbum.artists.map(p => <span onClick={()=>navigate(`${routesname.oneartist}?id=${p.id}`)} key={p.id}>{p.name}</span>)}</h3>
                    <h3>Categorias: {appState.oneAlbum.categories.map(p => <span key={p.id} onClick={()=>navigate(`${routesname.category}?id=${p.id}`)} >{p.title}</span>)}</h3>
                </div>
            </div>
            <h3 className="title2">Canciones</h3>
            <div className="contenedor contenedor_songs">
                <div className="rawheader">
                    <span className="col col1">Title</span>
                    <span className="col col2">Artistas</span>
                    <span className="col col3">Duracion</span>
                </div>
                {appState.songs.map(p=><SongComp key={p.id} {...p}/>)}
            </div>
        </>
    );
}
