import { useAppDispatch } from '../hooks';
import { userAction } from '../slices/userSlice';
import logo from '/myspotilogo.svg'


export function Header() {
  const dispatch = useAppDispatch();

  return (
    <header>
        <img src={logo} alt="title" />
        <h1>MySpoti</h1>
        <button onClick={()=> dispatch(userAction.logout())}>Log out</button>
    </header>
  );
}
