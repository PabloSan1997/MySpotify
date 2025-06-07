import React from "react";
import { createDataExtraReducer } from "../slices/extraReducers/appExtraReducer";
import { useAppDispatch, useAppSelector } from "../hooks";

export function ArtistForm() {
  const [title, setTitle] = React.useState('');
    const [picture, setPicture] = React.useState<File | null>(null)
    const [preview, setPreview] = React.useState('');
    const jwt = useAppSelector(state => state.user.jwt);
    const dispatch = useAppDispatch();
    React.useEffect(() => {
      if (picture != null) {
        const reader = new FileReader();
        reader.onload = e => {
          const u = e.target?.result ? e.target.result : '';
          setPreview(u.toString());
        }
        reader.readAsDataURL(picture);
      } else {
        setPreview('');
      }
    }, [picture]);
    return (
      <form className="form_admin category" onSubmit={e => {
        e.preventDefault();
        if (title.trim() && picture) {
          const formdata = new FormData();
          formdata.append('name', title);
          formdata.append('image', picture);
          dispatch(createDataExtraReducer({jwt, formdata:formdata, option:'artist'}));
        }
      }}>
        <h2>Agregar nuevo artista</h2>
        <label htmlFor="titlecat">Nombre</label>
        <input type="text" placeholder="Escribir..." id="titlecat" value={title} onChange={e => setTitle(e.target.value)}/>
        <label htmlFor="imagecat" className="add_file">Agregar imagen</label>
        <input
          type="file"
          accept="image/*"
          id="imagecat"
          style={{ display: 'none' }}
          onChange={e => {
            const files = e.target.files;
            if (files) {
              setPicture(files[0]);
            }
          }}
        />
        {preview.trim() && <img src={preview} alt='show image' />}
        <button type="submit">Agregar</button>
      </form>
    );
}
