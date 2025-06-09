import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { userAction } from "../slices/userSlice";
import { registerExtraReducer } from "../slices/extraReducers/userExtraReducer";



export function RegisterForm() {
    const dispatch = useAppDispatch();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [repeatPassord, setRepeatPassword] = React.useState('');
    const [nickname, setNikcname] = React.useState('');
    const state = useAppSelector(state => state.user);

    React.useEffect(() => {
        dispatch(userAction.writeMessage({ message: '' }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <form className="login_form" onSubmit={e => {
            e.preventDefault();
            if (repeatPassord !== password)
                dispatch(userAction.writeMessage({ message: 'Las contraseñas no coinciden' }));
            else if (password.trim() && repeatPassord.trim() && username.trim() && nickname.trim()) {
                dispatch(registerExtraReducer({ username, password, nickname }));
            } else {
                dispatch(userAction.writeMessage({ message: 'Llene todos los campos' }));
            }
        }}>
            <h2>Registrate</h2>
            <label>Nombre de usuario</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Escribir..." />
            <label>Nickname</label>
            <input type="text" value={nickname} onChange={e => setNikcname(e.target.value)} placeholder="Escribir..." />
            <label>Contraseña</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Escribir..." />
            <label>Repite la contraseña</label>
            <input type="password" value={repeatPassord} onChange={e => setRepeatPassword(e.target.value)} placeholder="Escribir..." />
            <button className="boton">Entrar</button>
            {state.message.trim() && <p className="error">{state.message}</p>}
        </form>
    );
}
