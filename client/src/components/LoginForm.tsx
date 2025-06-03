import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { loginExtrareducer } from "../slices/extraReducers/userExtraReducer";
import { userAction } from "../slices/userSlice";


export function LoginForm() {
    const dispatch = useAppDispatch();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const state = useAppSelector(state => state.user);
    React.useEffect(() => {
        dispatch(userAction.writeMessage({ message: '' }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <form className="login_form" onSubmit={e => {
            e.preventDefault();
            if (username.trim() && password.trim())
                dispatch(loginExtrareducer({ username, password }));
            else
                dispatch(userAction.writeMessage({ message: 'Llene todos los campos' }));
        }}>
            <h2>Log in</h2>
            <label>Nombre de usuairo</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Escribir..."/>
            <label>Contraseña</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Escribir..."/>
            <button>Entrar</button>
            {state.message.trim() && <p className="error">{state.message}</p>}
        </form>
    );
}
