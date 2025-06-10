import { useNavigate } from "react-router-dom";
import { routesname } from "../routes/routesname";
import { XCircleIcon } from '@heroicons/react/24/solid';
import { useAppDispatch, useAppSelector } from "../hooks";
import { deleteOneElementExtraReducer } from "../slices/extraReducers/appExtraReducer";


export function AlbumCom({ title, urlImage, artists, categories, id }: Album) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const userState = useAppSelector(state => state.user);
    const go = () => {
        navigate(`${routesname.onealbum}?id=${id}`);
    }

    const deleteAlbum = () => {
        if (confirm("Seguro que desea eliminar Album?"))
            dispatch(deleteOneElementExtraReducer({ jwt: userState.jwt, id, option: "album" }));
    }

    return (
        <div className="album" onClick={go}>
            {userState.isAdmin && <XCircleIcon onClick={deleteAlbum} className="delete_button" />}
            <img src={urlImage} alt={title} />
            <div className="area_info">
                <h3>{title}</h3>
                <div className="artists">
                    {artists.map(a => <span key={a.id}>{a.name}</span>)}
                </div>
                <div className="categories">
                    {categories.map(c => <span key={c.id}>{c.title}</span>)}
                </div>
            </div>
        </div>
    );
}
