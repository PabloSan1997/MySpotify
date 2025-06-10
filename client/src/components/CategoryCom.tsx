import { useNavigate } from "react-router-dom";
import { XCircleIcon } from '@heroicons/react/24/solid';
import { useAppDispatch, useAppSelector } from "../hooks";
import { deleteOneElementExtraReducer } from "../slices/extraReducers/appExtraReducer";

interface ComponateBase extends Category {
  pathbase: string;
  option:OptionsApi
}


export function CategoryCom({ title, urlImage, id, pathbase, option }: ComponateBase) {
  const navigate = useNavigate();
  const userState = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const go = () => {
    navigate(pathbase + `?id=${id}`);
  }

  const deleteCategory = () => {
    if (confirm("Seguro que desea eliminar Album?"))
      dispatch(deleteOneElementExtraReducer({ jwt: userState.jwt, id, option }));
  }

  return (
    <div className="category" onClick={go}>
      {userState.isAdmin && <XCircleIcon className="delete_button" onClick={deleteCategory}/>}
      <img src={urlImage} alt={title} />
      <h3>{title}</h3>
    </div>
  );
}
