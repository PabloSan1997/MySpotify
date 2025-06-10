/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { deleteOneElementExtraReducer, findOneSongExtraReducer } from "../slices/extraReducers/appExtraReducer";
import { secondsToMinutes } from "../utils/secondsToMinutes";
import { XCircleIcon } from '@heroicons/react/24/solid';

export function SongComp({ title, urlAudio, urlImage, album, id }: Song) {
    const dispatch = useAppDispatch();
    const jwt = useAppSelector(state => state.user.jwt);
    const [min, setMin] = React.useState('');
    const audio = useMemo(() => new Audio(), []);
    const userState = useAppSelector(state => state.user);

    const deleteSong = () => {
        if (confirm("Seguro que desea eliminar cancion?"))
            dispatch(deleteOneElementExtraReducer({ jwt: userState.jwt, id, option: "album/song" }));
    }

    React.useEffect(() => {
        audio.src = urlAudio;
        const eventaudio = () => {
            setMin(audio.duration + '');
        }
        audio.addEventListener('loadedmetadata', eventaudio);
        return () => {
            audio.removeEventListener('loadedmetadata', eventaudio);
        }
    }, []);

    return (
        <div className="song" onClick={() => dispatch(findOneSongExtraReducer({ id, jwt }))}>
            {userState.isAdmin && <XCircleIcon className="delete_button" onClick={deleteSong} />}
            <div className="column titlecolum">
                <img src={urlImage} alt={title} />
                <h3>{title}</h3>
            </div>
            <div className="column column_artist">
                {album.artists.map(p => <span key={p.id}>{p.name}</span>)}
            </div>
            <div className="column column_duration">
                <span>{secondsToMinutes(Number(min))}</span>
            </div>
        </div>
    );
}
