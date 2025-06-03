import { NavLink } from 'react-router-dom';
import '../styles/loginheader.scss';
import logo from '/myspotilogo.svg'
import { routesname } from '../routes/routesname';

export function LoginHeader() {
  return (
    <header>
        <img src={logo} alt="title" />
        <h1>MySpoti</h1>
        <nav className='login_nav'>
            <NavLink to={routesname.login}>Login</NavLink>
            <NavLink to={routesname.register}>Register</NavLink>
        </nav>
    </header>
  );
}
