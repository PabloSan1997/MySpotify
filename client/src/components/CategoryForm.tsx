import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { createDataExtraReducer } from "../slices/extraReducers/appExtraReducer";


export function CategoryForm() {
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
        formdata.append('title', title);
        formdata.append('image', picture);
        dispatch(createDataExtraReducer({jwt, formdata:formdata, option:'category'}));
      }
    }}>
      <h2>Agregar nueva categoria</h2>
      <label htmlFor="titlecat">Title</label>
      <input type="text" className="input_general" placeholder="Escribir..." id="titlecat" value={title} onChange={e => setTitle(e.target.value)}/>
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
      <button type="submit" className="boton">Agregar</button>
    </form>
  );
}
