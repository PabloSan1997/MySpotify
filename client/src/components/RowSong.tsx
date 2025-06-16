

interface NewSongCompnent extends NewSong {
    index: number;
    onChangeText(text: string): void
    onChangeAudio(data: FileList | null): void
}
export function RowSong({ title, audio, onChangeText, onChangeAudio, index }: NewSongCompnent) {



    return (
        <div className="row_song">
            <h3>Cancion numero: {index + 1}</h3>
            <label htmlFor={'title' + index}>Titulo</label>
            <input type="text" id={'title' + index} value={title} onChange={e => onChangeText(e.target.value)} />
            <label htmlFor={'audio' + index} className="like_button ">Cancion</label>
            <input
                type="file"
                id={'audio' + index} accept=".mp3, .wav, audio/mpeg, audio/wav"
                onChange={e => onChangeAudio(e.target.files)}
            />
            <p className="res">{audio?.name}</p>
        </div>
    );
}
