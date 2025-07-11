import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { findOneSongExtraReducer } from "../slices/extraReducers/appExtraReducer";
import { routesname } from "../routes/routesname";


export function YourOneSong({ title, urlImage, album, id }: Song) {
  const dispatch = useAppDispatch();
  const jwt = useAppSelector(state => state.user.jwt);
  const navigate = useNavigate();
  return (
    <div className="your_one_song" onClick={()=> dispatch(findOneSongExtraReducer({jwt, id}))}>
     {urlImage.trim() && <img src={urlImage} alt={title} />}
      <div className="area_info">
        <span className="title">{title}</span>
        <div className="artist">{album.artists.map(p=><span 
        key={p.id} 
        onClick={()=> navigate(`${routesname.oneartist}?id=${p.id}`)} 
        >{p.name}</span>)}</div>
      </div>
    </div>
  );
}
