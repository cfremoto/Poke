import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemons } from "../actions";
import estilos from './SearchBar.module.css';

export default function SearchBar(){
    const dispatch = useDispatch();
    const [nombre, setNombre] = useState('')

    function handleInputChange(e){
        e.preventDefault()
        setNombre(e.target.value.toLowerCase())
    }

    function handleSubmit(e){
        e.preventDefault()
        if(nombre){
        dispatch(getNamePokemons(nombre))
        setNombre('')
        }
    }

    return(
        <div>
            <input
            type= 'text'
            placeholder= "Nombre del Pokemon"
            value={nombre}
            onChange={handleInputChange}
            className={estilos.contenedor}
            />
            <button type="submit" onClick={handleSubmit} className={estilos.btn}>Buscar</button>
        </div>
    )
}
