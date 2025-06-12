import {useAppSelector } from "../hooks";
import { YourOneSong } from "./YourOneSong";
import '../styles/yoursong.scss';


export function YourSongs() {
    const appState = useAppSelector(state => state.app);

    return (
        <>
            <h2 className="title_songs">Tus musica</h2>
            <div className="contenedor_yoursong">
                {appState.songs.map(p => <YourOneSong key={p.id} {...p} />)}
            </div>
        </>
    );
}
