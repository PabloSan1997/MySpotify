/* eslint-disable react-hooks/exhaustive-deps */
import { CategoryListCom } from "../components/CategoryListCom";
import { useAppDispatch, useAppSelector } from "../hooks";
import React from "react";
import { findListCategoryExtraReducer } from "../slices/extraReducers/appExtraReducer";
import '../styles/home.scss';

export function Home() {
  const appstate = useAppSelector(state => state.app);
  const userstate = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(findListCategoryExtraReducer({ jwt: userstate.jwt }));
  }, [userstate.jwt]);


  return (
    <>
      <h2 className="title">Home</h2>
      <div className="contenedor">
        {appstate.categoryList.map(c => <CategoryListCom key={c.id} {...c} />)}
      </div>
    </>
  );
}
