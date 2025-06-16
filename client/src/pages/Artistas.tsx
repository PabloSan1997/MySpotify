/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { CategoryCom } from "../components/CategoryCom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { findArtistsExtraReducer } from "../slices/extraReducers/appExtraReducer";
import { routesname } from "../routes/routesname";


export function Artistas() {
    const appState = useAppSelector(state => state.app);
    const userState = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(findArtistsExtraReducer({ jwt: userState.jwt }));
    }, [userState.jwt]);

    if(appState.loading) return <div className="loading"></div>
    
    return (
        <>
            <h2 className="title">Artistas</h2>
            <div className="contenedor contenedor_list">
                {appState.artists.map(c =>
                    <CategoryCom
                    option={"artist"}
                        key={c.id}
                        id={c.id}
                        urlImage={c.urlImage}
                        title={c.name}
                        pathbase={routesname.oneartist}
                    />
                )}
            </div>
        </>
    );
}
