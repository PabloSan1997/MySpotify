/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { CategoryCom } from "../components/CategoryCom";
import { findCategoriesExtraReducer } from "../slices/extraReducers/appExtraReducer";
import '../styles/contenedor_categories.scss';
import { routesname } from "../routes/routesname";

export function CategoriesPage() {
  const appState = useAppSelector(state => state.app);
  const userState = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(findCategoriesExtraReducer({ jwt: userState.jwt }));
  }, [userState.jwt]);

  return (
    <>
      <h2 className="title">Categorias</h2>
      <div className="contenedor contenedor_list">
        {appState.category.map(c => <CategoryCom option={"category"} key={c.id} {...c} pathbase={routesname.category}/>)}
      </div>
    </>
  );
}
