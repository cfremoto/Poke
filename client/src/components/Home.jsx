import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { cleanDetail, filterByTypes, filterCreated, getPokemons, getTypes, orderByName, orderByStats } from "../actions";
import Card from './Card';
import estilos from './Home.module.css';
import Paginado from './Paginado';
import SearchBar from './SearchBar';





export default function Home(){
    const dispatch = useDispatch()
    const allPokemons = useSelector((state)=> state.pokemons)
    const allTipos = useSelector((state)=> state.tipos)
    const [orden, setOrden] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [pokemonsPerPage, setPokemonsPerPage]= useState(12)
    const indexOfLastPokemon = currentPage * pokemonsPerPage
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)

    console.log(allPokemons)
    const stats = [
        'vida max', 'vida min','fuerza max', 'fuerza min','defensa max', 'defensa min', 'velocidad max', 'velocidad min', 'altura max', 'altura min', 'peso max', 'peso min'
    ]

    const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getPokemons())
        dispatch(getTypes())
        dispatch(cleanDetail())
    }, [dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemons())
    }

    function handleFilterTypes(e){
        e.preventDefault()
        dispatch(filterByTypes(e.target.value))
        setCurrentPage(1)
    }
    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
        setCurrentPage(1)
    }
    function handleSort(e){
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }
    function handleSortStats(e) {
        dispatch(orderByStats(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    return(
        <div className={estilos.body}>
            <h1 className={estilos.titulo}>Pokepágina: ¡Atrapalos a todos!</h1>
            <div className={estilos.separar}>
            <button className= {estilos.btn} onClick ={handleClick}>Volver a cargar todos los pokemons</button>
            <Link to= '/pokemon'><button className= {estilos.btn}>Crear Pokemon</button></Link>
            </div>
            <div>
                <div className={estilos.separacion}>
                    <select onChange={handleSort} className= {estilos.btn}>
                        <option value= 'All'>Ordenar por Nombre</option>
                        <option value = 'asc'>A-Z</option>
                        <option value= 'desc'>Z-A</option>
                        </select>
                    <select onChange={handleSortStats} className= {estilos.btn}>
                        <option value= 'All'>Ordenar por Habilidad</option>
                        {
                            stats.map((e, i) => (
                                <option key={i} value={e}>{e}</option>
                            ))
                        }
                    </select>
                    <select onChange={(e)=>handleFilterTypes(e)} className= {estilos.btn}>
                        <option value= 'All'>Tipos</option>
                        {allTipos && allTipos.map((e, i)=>(
                            <option key={i} value={e.name}>{e.name}</option>
                        ))}
                    </select>

                    <select onChange = {(e)=>handleFilterCreated(e)} className= {estilos.btn}>
                        <option value= 'All'>Origen</option>
                        <option value= 'createInDb'>Creados</option>
                        <option value= 'api'>Existentes</option>
                    </select>
                    <SearchBar/>
                </div>
                <Paginado
                pokemonsPerPage={pokemonsPerPage}
                allPokemons={allPokemons.length}
                paginado = {paginado}/>
                <div className={estilos.acomodar}>
                {
                    allPokemons.length ?
                    currentPokemons && currentPokemons.map(e=>{
                        return(
                            <Card id={e.id} imagen={e.imagen} nombre={e.nombre} tipo={e.tipo} key={e.id} />
                        )
                    }) : <img src="https://i.pinimg.com/originals/66/89/dc/6689dc331be27e66349ce9a4d15ddff3.gif" alt='loading'></img>
                }
                </div>
            </div>
        </div>
    )

}
