import { useAppDispatch, useAppSelector } from "../hooks";
import perfil from '../assets/perfil.svg';
import '../styles/perfil.scss';
import React from "react";
import { updateperfilpictureExtraReducer } from "../slices/extraReducers/userExtraReducer";


export function Perfil() {
    const dispatch = useAppDispatch();
    const userstate = useAppSelector(state => state.user);
    const [picture, setPicture] = React.useState<File | null>(null)
    const [preview, setPreview] = React.useState('');

    React.useEffect(() => {
        if (picture != null) {
            const reader = new FileReader();
            reader.onload = e => {
                const u = e.target?.result ? e.target.result : '';
                setPreview(u.toString());
            }
            reader.readAsDataURL(picture);
        } else {
            setPreview('');
        }
    }, [picture]);

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (picture != null) {
            console.log('subieno')
            const formData = new FormData();
            formData.append('image', picture);
            dispatch(updateperfilpictureExtraReducer({ jwt: userstate.jwt, formdata: formData })).then(() => {
                setPicture(null);
            });;
        }

    }

    return (
        <>
            <div className="perfil_area_info">
                <img src={userstate.userinfo.urlImage.trim() ? userstate.userinfo.urlImage.trim() : perfil} alt={userstate.userinfo.username} />
                <h2>{userstate.userinfo.nickname}</h2>
                <h3>@{userstate.userinfo.username}</h3>
            </div>
            <form className="login_form perfil_form" onSubmit={submit}>
                <label htmlFor="updatepicture">Actualizar foto de perfil</label>
                <input
                    type="file"
                    id="updatepicture"
                    accept="image/*"
                    onChange={e => {
                        if (e.target.files) {
                            setPicture(e.target.files[0]);
                        }
                    }}
                />
                {preview.trim() && <img className="preview_image" src={preview} alt="preview" />}
                <button type="submit" className="boton">Actualizar</button>
            </form>
        </>
    );
}
