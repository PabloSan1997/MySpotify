/* eslint-disable react-hooks/exhaustive-deps */

import React from "react";
import { createDataExtraReducer,  findArtistAndCategoryListExtraReducer } from "../slices/extraReducers/appExtraReducer";
import { useAppDispatch, useAppSelector } from "../hooks";


export function SongForm() {
  const [title, setTitle] = React.useState('');
  const [picture, setPicture] = React.useState<File | null>(null);
  const [categories, setCategories] = React.useState<number[]>([]);
  const [artistas, setArtistas] = React.useState<number[]>([]);
  const [preview, setPreview] = React.useState('');
  const jwt = useAppSelector(state => state.user.jwt);
  const appState = useAppSelector(state => state.app);
  const dispatch = useAppDispatch();
  const addCategory = (id: number) => {
    if (!categories.includes(id))
      setCategories(d => [...d, id]);
  }
  const addArtist = (id: number) => {
    if (!artistas.includes(id))
      setArtistas(d => [...d, id]);
  }

  const deleteCategory = (id: number): void => {
    const cats = categories.filter(p => p !== id);
    setCategories(cats)
  }
  const deleteArtist = (id: number): void => {
    const cats = artistas.filter(p => p !== id);
    setArtistas(cats)
  }
  const getCategory = (id: number): string => {
    const cat = appState.category.find(p => p.id == id);
    return cat ? cat.title : '';
  }
   const getArtist = (id: number): string => {
    const cat = appState.artists.find(p => p.id == id);
    return cat ? cat.name : '';
  }
  React.useEffect(() => {
    dispatch(findArtistAndCategoryListExtraReducer({ jwt }));
  }, []);
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
    <>
    {}
      <form className="form_admin form_album" onSubmit={e => {
        e.preventDefault();
        if (title.trim() && picture && artistas.length >0 && categories.length > 0) {
          const formdata = new FormData();
          formdata.append('title', title);
          formdata.append('image', picture);
          formdata.append("categorylist", JSON.stringify(categories));
          formdata.append("artistlist", JSON.stringify(artistas));
          dispatch(createDataExtraReducer({ jwt, formdata: formdata, option: 'album' }));
        }
      }}>
        <h2>Agregar Nuevo Album</h2>
        <label htmlFor="titlealb">Title</label>
        <input type="text" className="input_general" placeholder="Escribir..." id="titlealb" value={title} onChange={e => setTitle(e.target.value)} />

        <label htmlFor="categoriasalbum">Categorias</label>
        <select name="" defaultValue={""} id="categoriasalbum" className="input_general" onChange={e => addCategory(Number(e.target.value))}>
           <option value="" disabled style={{display:'none'}}></option>
          {appState.category.map(p => <option value={p.id}>{p.title}</option>)}
        </select>
        <p className="listcategories">{categories.map(p => <span onClick={() => deleteCategory(p)} key={p}>{getCategory(p)}</span>)}</p>

        <label htmlFor="artistlist">Artistas</label>
        <select defaultValue={""} id="artistlist" className="input_general" onChange={e => addArtist(Number(e.target.value))}>
          <option value="" disabled style={{display:'none'}}></option>
          {appState.artists.map(p => <option value={p.id}>{p.name}</option>)}
        </select>
        <p className="listcategories">{artistas.map(p => <span onClick={() => deleteArtist(p)} key={p}>{getArtist(p)}</span>)}</p>

        <label htmlFor="imagealb" className="add_file">Agregar imagen</label>
        <input
          type="file"
          accept="image/*"
          id="imagealb"
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
    </>
  );
}
