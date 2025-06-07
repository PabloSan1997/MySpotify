/* eslint-disable react-hooks/exhaustive-deps */


import React from "react";
import { createDataExtraReducer, findCategoriesExtraReducer } from "../slices/extraReducers/appExtraReducer";
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
  const deleteCategory=(id:number):void=>{
    const cats = categories.filter(p=> p !== id);
    setCategories(cats)
  }
  const getCategory = (id:number):string =>{
    const cat = appState.category.find(p=>p.id == id);
    return cat?cat.title:'';
  }
  React.useEffect(() => {
    dispatch(findCategoriesExtraReducer({ jwt }));
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
      <form className="form_admin category" onSubmit={e => {
        e.preventDefault();
        if (title.trim() && picture) {
          const formdata = new FormData();
          formdata.append('title', title);
          formdata.append('image', picture);
          dispatch(createDataExtraReducer({ jwt, formdata: formdata, option: 'album' }));
        }
      }}>
        <h2>Agregar Nuevo Album</h2>
        <label htmlFor="titlealb">Title</label>
        <input type="text" placeholder="Escribir..." id="titlealb" value={title} onChange={e => setTitle(e.target.value)} />
        <label htmlFor="categoriasalbum">Categorias</label>
        <select name="" id="" onChange={e => addCategory(Number(e.target.value))}>
          {appState.category.map(p => <option value={p.id}>{p.title}</option>)}
        </select>
        <p className="listcategories">{categories.map(p => <span onClick={()=>deleteCategory(p)} key={p}>{getCategory(p)}</span>)}</p>
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
        <button type="submit">Agregar</button>
      </form>
    </>
  );
}
