/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from "react";


export function SongComp({ title, urlAudio, urlImage, album }: Song) {

    const [min, setMin] = React.useState('');
    const audio = useMemo(() => new Audio(), []);

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
       <div className="song">
        <div className="column titlecolum">
            <img src={urlImage} alt={title} />
            <h3>{title}</h3>
        </div>
        <div className="column column_artist">
            {album.artists.map(p=> <span key={p.id}>{p.name}</span>)}
        </div>
        <div className="column column_duration">
            <span>{min}</span>
        </div>
       </div>
    );
}
