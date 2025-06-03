import { HashRouter, Navigate, useRoutes } from "react-router-dom";
import { routesname } from "./routesname";
import { Login } from "../pages/Login";
import { MainLayout } from "../pages/MainLayout";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/Register";
import { Perfil } from "../components/Perfil";

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
        element:<MainLayout/>
    },
    {
        path:routesname.register,
        element:<Login><RegisterForm/></Login>
    },
    {
        path:routesname.perfil,
        element:<MainLayout><Perfil/></MainLayout>
    }
]);



export function RoutsIndex() {
    return (
        <HashRouter>
            <Routes />
        </HashRouter>
    );
}
