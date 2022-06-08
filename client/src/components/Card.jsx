import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deletePoke } from '../actions';
import estilos from './Card.module.css';

export default function Card({ id, imagen, nombre, tipo }) {
    const dispatch = useDispatch();
    const deletePokes = useSelector((state) => state.delete)

  function handleDelete(e, id) {
    dispatch(deletePoke(id))
    alert(deletePokes.info)
  }
    return(
      <div className={estilos.carta}>
        {
          id > 2
            ? <button
                onClick={(e) => handleDelete(id)}
              >X</button>
            : null

        }
        <img src={imagen} alt='img not found' width='200px' height='250px' className={estilos.subeBaja }/>
            <Link to={'/home/' + id} className={estilos.nombre}>
                <h3 >{nombre}</h3>
            </Link>
            {tipo && tipo.map((t, i) => (
          <span className={estilos.tipos} key={i}>
            {" "}
            {t}
          </span>
        ))}
        </div>
    )
}
