import React from "react";
import { CategoryForm } from "../components/CategoryForm";
import { ArtistForm } from "../components/ArtistForm";
import { SongForm } from "../components/AlbumForm";
import '../styles/admin.scss';
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { routesname } from "../routes/routesname";
import { useAppSelector } from "../hooks";

export function AdminPage() {
  const [search] = useSearchParams();
  const option = search.get('option');
  const userstate = useAppSelector(state => state.user);
  if(!userstate.isAdmin)
    return <Navigate to={routesname.home}/>
  if(!option)
    return <Navigate to={`${routesname.admin}?option=category`}/>
  return (
    <>
      <h2 className="title">Administrar</h2>
      <div className="area_part">
        <Link className={option == 'category'?'option active':'option'} to={`${routesname.admin}?option=category`} >Categoria</Link>
        <Link className={option == 'artist'?'option active':'option'} to={`${routesname.admin}?option=artist`}>Artista</Link>
        <Link className={option == 'album'?'option active':'option'} to={`${routesname.admin}?option=album`}>Album</Link>
      </div>
      <div className="contenedor_admin">
          {option == 'category' && <CategoryForm />}
          {option == 'artist' && <ArtistForm />}
          {option == 'album' && <SongForm />}
      </div>
    </>
  );
}
