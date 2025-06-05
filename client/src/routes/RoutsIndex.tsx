import { HashRouter, Navigate, useRoutes } from "react-router-dom";
import { routesname } from "./routesname";
import { Login } from "../pages/Login";
import { MainLayout } from "../pages/MainLayout";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/Register";
import { Perfil } from "../components/Perfil";
import { Home } from "../pages/Home";
import { CategoriesPage } from "../pages/CategoriesPage";
import { Artistas } from "../pages/Artistas";
import { OneCategory } from "../pages/OneCategory";
import { OneArtist } from "../pages/OneArtist";

const Routes = () => useRoutes([
    {
        path: routesname.login,
        element: <Login><LoginForm/></Login>
    },
    {
        path: '/',
        element: <Navigate to={routesname.login} />
    },
    {
        path:routesname.home,
        element:<MainLayout><Home/></MainLayout>
    },
    {
        path:routesname.register,
        element:<Login><RegisterForm/></Login>
    },
    {
        path:routesname.perfil,
        element:<MainLayout><Perfil/></MainLayout>
    },
    {
        path:routesname.categories,
        element:<MainLayout><CategoriesPage/></MainLayout>
    },
    {
        path:routesname.artists,
        element:<MainLayout><Artistas/></MainLayout>
    },
    {
        path:routesname.category,
        element:<MainLayout><OneCategory/></MainLayout>
    },
    {
        path:routesname.oneartist,
        element:<MainLayout><OneArtist/></MainLayout>
    }
]);



export function RoutsIndex() {
    return (
        <HashRouter>
            <Routes />
        </HashRouter>
    );
}
