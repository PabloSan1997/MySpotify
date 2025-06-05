import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { routesname } from "../routes/routesname";
import { Header } from "../components/Header";
import React from "react";
import '../styles/layout.scss';
import { IntroComponent } from "../components/IntroComponent";
import { YourSongs } from "../components/YourSongs";
import { AdsPart } from "../components/AdsPart";

export function MainLayout({children}:React.PropsWithChildren) {
  const userstate = useAppSelector(state => state.user);
  if (!userstate.jwt.trim())
    return <Navigate to={routesname.login} />
  return (
    <>
      <Header />
      <main>
        <div className="area_main area_intro">
          <IntroComponent/>
           <YourSongs/>
        </div>
        <div className="area_main area_info">
          {children}
        </div>
        <div className="area_main area_anuncio">
          <AdsPart/>
          <AdsPart/>
        </div>
      </main>
      <div className="area_play">
      </div>
    </>
  );
}
