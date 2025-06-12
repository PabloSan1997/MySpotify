/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { SongComp } from "../components/SongComp";
import { AlbumCom } from "../components/AlbumCom";
import { CategoryCom } from "../components/CategoryCom";
import { routesname } from "../routes/routesname";
import { searchDataExtraReducer } from "../slices/extraReducers/appExtraReducer";
import { useNavigate, useSearchParams } from "react-router-dom";
import '../styles/search.scss';

export function SearchPage() {
    const userstate = useAppSelector(state => state.user);
    const appstate = useAppSelector(state => state.app);
    const dispatch = useAppDispatch();
    const [title, setTitle] = React.useState('');
    const [titlesearch] = useSearchParams();
    const viewtitle = titlesearch.get('view');
    const navigate = useNavigate();
    React.useEffect(() => {
        if (viewtitle && viewtitle.trim())
            dispatch(searchDataExtraReducer({ jwt: userstate.jwt, title: viewtitle }));
        
    }, [viewtitle]);

    return (
        <>
            <form
            className="form_search" 
            onSubmit={e => {
                e.preventDefault();
                if(title.trim())
                    navigate(`${routesname.search}?view=${title}`);
            }}>
                <input type="text" placeholder="Buscar..." value={title} onChange={e => setTitle(e.target.value)} />
                <button className="boton" type="submit">Buscar</button>
            </form>
            <h2 className="title">Canciones</h2>
            <div className="contenedor contenedor_songs">
                <div className="rawheader">
                    <span className="col col1">Title</span>
                    <span className="col col2">Artistas</span>
                    <span className="col col3">Duracion</span>
                </div>
                {appstate.songs.map(p => <SongComp key={p.id} {...p} />)}
            </div>
            <h2 className="title">Albums</h2>
            <div className="contenedor contenedor_album">
                {appstate.albums.map(s => <AlbumCom key={s.id} {...s} />)}
            </div>

            <h2 className="title">Artistas</h2>
            <div className="contenedor contenedor_list">
                {appstate.artists.map(c =>
                    <CategoryCom
                        option={"artist"}
                        key={c.id}
                        id={c.id}
                        urlImage={c.urlImage}
                        title={c.name}
                        pathbase={routesname.oneartist}
                    />
                )}
            </div>
        </>
    );
}
