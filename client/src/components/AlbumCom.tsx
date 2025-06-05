import { useNavigate } from "react-router-dom";
import { routesname } from "../routes/routesname";



export function AlbumCom({ title, urlImage, artists, categories, id }: Album) {
    const navigate = useNavigate();
    const go = () => {
        navigate(`${routesname.onealbum}?id=${id}`);
    }
    return (
        <div className="album" onClick={go}>
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
