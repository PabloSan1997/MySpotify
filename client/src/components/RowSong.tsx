import React from "react";


interface NewSongCompnent extends NewSong {
    index: number;
    onChangeText(text: string): void
    onChangeAudio(data: FileList | null): void
    onChangeImage(data: FileList | null): void
}
export function RowSong({ title, image, audio, onChangeText, onChangeImage, onChangeAudio, index }: NewSongCompnent) {
    const [picture, setPicture] = React.useState('');

    React.useEffect(() => {
        if (image != null) {
            const reader = new FileReader();
            reader.onload = e => {
                const u = e.target?.result ? e.target.result : '';
                setPicture(u.toString());
            }
            reader.readAsDataURL(image);
        } else {
            setPicture('');
        }
    }, [image]);

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
            <label htmlFor={'image' + index} className="like_button ">Portada</label>
            <input
                type="file"
                id={'image' + index}
                accept="image/*"
                onChange={e => onChangeImage(e.target.files)}
            />
            {picture && <img src={picture} alt={image?.name} />}
        </div>
    );
}
