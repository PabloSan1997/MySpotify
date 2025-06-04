import { useNavigate } from "react-router-dom";


interface ComponateBase extends Category {
  pathbase: string;
}


export function CategoryCom({ title, urlImage, id, pathbase }: ComponateBase) {
  const navigate = useNavigate();
  const go = () => {
    navigate(pathbase + `?id=${id}`);
  }
  return (
    <div className="category" onClick={go}>
      <img src={urlImage} alt={title} />
      <h3>{title}</h3>
    </div>
  );
}
