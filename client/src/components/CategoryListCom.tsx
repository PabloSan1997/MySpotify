import { Link, useNavigate } from "react-router-dom";
import { routesname } from "../routes/routesname";

export function CategoryListCom({ title, albums, id }: CategoryList) {


  const navigate = useNavigate();
  const go = (idAlbum:number) => {
    navigate(`${routesname.onealbum}?id=${idAlbum}`);
  }

  return (
    <div className="section category_list">
      <h3><Link to={routesname.category + `?id=${id}`}>{title}</Link></h3>
      <div className="albums">
        {albums.map((p) => (
          <div className="album" key={p.id} onClick={()=> go(p.id)}>
            <img src={p.urlImage} alt={p.title} />
            <h4>{p.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
