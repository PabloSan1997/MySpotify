
import React from "react";
import { routesname } from "../routes/routesname";
import { useAppDispatch, useAppSelector } from "../hooks";
import { viewuserinfoExtraReducer } from "../slices/extraReducers/userExtraReducer";
import '../styles/info.scss';
import perfillogo from '../assets/perfil.svg';
import { NavLink } from "react-router-dom";
import { HomeIcon, MagnifyingGlassIcon, UserGroupIcon, UserCircleIcon, BriefcaseIcon, TagIcon } from '@heroicons/react/24/solid';

export function IntroComponent() {
    const userstate = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    React.useEffect(()=>{
        dispatch(viewuserinfoExtraReducer({jwt: userstate.jwt}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[userstate.jwt, userstate.userinfo.urlImage]);
  return (
    <div className="info">
        <div className="info_user">
            <img src={userstate.userinfo.urlImage.trim()?userstate.userinfo.urlImage.trim():perfillogo} alt={userstate.userinfo.username} />
            <div className="area_names">
                <span className="nickname">{userstate.userinfo.nickname}</span>
                <span className="username">@{userstate.userinfo.username}</span>
            </div>
        </div>
        <nav>
            <NavLink to={routesname.home}><HomeIcon className="logo_icon"/> Incio</NavLink>
            <NavLink to={routesname.search}><MagnifyingGlassIcon className="logo_icon"/> Buscar</NavLink>
            {userstate.isAdmin && <NavLink to={routesname.admin}><BriefcaseIcon className="logo_icon"/> Admin</NavLink>}
            <NavLink to={routesname.perfil}><UserCircleIcon className="logo_icon"/> Perfil</NavLink>
            <NavLink to={routesname.artists}><UserGroupIcon className="logo_icon"/> Artistas</NavLink>
            <NavLink to={routesname.categories}><TagIcon className="logo_icon"/> Categorias</NavLink>
        </nav>
    </div>
  );
}
