/* eslint-disable react-hooks/exhaustive-deps */
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import React from "react";
import { createSongsExtraReducer, findSongByAlbumExtraReducer } from "../slices/extraReducers/appExtraReducer";
import '../styles/pageForm.scss';
import { RowSong } from "../components/RowSong";
import { viewInformation } from "../utils/viewInformation";
import { appActions } from "../slices/appSlice";

export function SongFormAdmin() {
    const appState = useAppSelector(state => state.app);
    const userState = useAppSelector(state => state.user);
    const [search] = useSearchParams();
    const idsearch = Number(search.get('id'));
    const id: number = isNaN(idsearch) ? 0 : idsearch;
    const dispatch = useAppDispatch();
    const [songs, setSongs] = React.useState<NewSong[]>([
        {
            audio: null,
            title: ''
        }
    ]);


    const addNumberSongsSong = () => {
        setSongs(s => [...s, {
            audio: null,
            title: ''
        }])
    }
    const restartNumberSongsSong = () => {
        if (songs.length > 1) {
            setSongs(s => {
                const clone = [...s];
                clone.splice(s.length - 1, 1);
                return clone;
            })
        }
    }



    React.useEffect(() => {
        if (appState.oneAlbum.id == 0 || appState.oneAlbum.id !== id)
            dispatch(findSongByAlbumExtraReducer({ jwt: userState.jwt, id }));
        dispatch(appActions.writeMessage({ message: '' }));
    }, []);

    if (appState.loading) return <div className="loading"></div>

    return (
        <>
            <h2 className="title">Agregar canciones</h2>
            <div className="album_info_cancionform">
                <img src={appState.oneAlbum.urlImage} alt={appState.oneAlbum.title} />
                <div className="area_info">
                    <h3>{appState.oneAlbum.title}</h3>
                    <span>{appState.oneAlbum.artists.map(p => p.name).join(', ')}</span>
                </div>
            </div>
            <form className="song_form" onSubmit={e => {
                e.preventDefault();
                if (viewInformation(songs)) {
                    const formdatas: FormData[] = songs.map(({ title, audio }) => {
                        const formdata = new FormData();
                        formdata.append('title', title);
                        formdata.append('audio', audio as File);
                        return formdata;
                    })
                    dispatch(createSongsExtraReducer({ jwt: userState.jwt, data: formdatas, id }));
                } else
                    dispatch(appActions.writeMessage({ message: 'Llene todos los campos' }))
            }}>
                {songs.map((s, i) => <RowSong
                    key={i}
                    {...s}
                    index={i}
                    onChangeText={(a: string) => {
                        setSongs(d => {
                            d[i].title = a;
                            return [...d];
                        })
                    }}
                    onChangeAudio={(a) => {
                        if (a && a[0]) {
                            setSongs(d => {
                                d[i].audio = a[0];
                                return [...d];
                            })

                        }
                    }}
                />)}

                <div className="area_add_rest">
                    <button type="button" className="boton" onClick={addNumberSongsSong}>+</button>
                    <button type="button" className="boton" onClick={restartNumberSongsSong}>-</button>
                </div>
                <button type="submit" className="boton">Agregar</button>
                <p className="error">{appState.message}</p>
            </form>
        </>
    );
}
