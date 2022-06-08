import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import { getDetail } from "../actions";
import estilos from './Detail.module.css';


export default function Detail(){
    const dispatch= useDispatch()
    const {id} =useParams()
    let miPoke = useSelector((state) => state.detail)
    useEffect(()=>{
        dispatch(getDetail(id))
    }, [id, dispatch])


    return(
        <div>
            <Link to= '/home'><button className={estilos.btn}>Volver</button></Link>
            {miPoke.length

                ? miPoke.length &&
                (<div className={estilos.detalle}>
                    <div className={estilos.titulo}><h1>¡Un {miPoke[0].nombre} salvaje ha aparecido!</h1> </div>
                <div className={estilos.carta}>
                    <img src={miPoke[0].imagen} alt={miPoke[0].nombre} width='500px' height='500px' />
                    <div className={estilos.palabra}>
                    <h3  className={estilos.tipos}>Tipos: {miPoke[0].tipo && miPoke[0].tipo.map((e,i)=>(
                        <span key={i}>{e}{" "}</span>
                    ))}</h3>
                    <h3>ID: {miPoke[0].id}</h3>
                    <h3>Vida: {miPoke[0].vida}</h3>
                    <h3>Fuerza: {miPoke[0].fuerza}</h3>
                    <h3>Defensa: {miPoke[0].defensa}</h3>
                    <h3>Velocidad: {miPoke[0].velocidad}</h3>
                    <h3>Altura: {miPoke[0].altura}</h3>
                    <h3>Peso: {miPoke[0].peso}</h3>
                    </div>
                    </div>
                </div>) : <img classname={estilos.loading} src="https://c.tenor.com/F30e8arYkdYAAAAC/pokemon-spinning.gif" alt="loading" />
            }
        </div>
    )
}
