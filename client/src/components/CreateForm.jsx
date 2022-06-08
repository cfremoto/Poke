import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTypes, postPokemon } from "../actions";
import estilos from './CreateForm.module.css';


export default function CreateForm(){
    const dispatch = useDispatch();
    const tipos = useSelector((state)=> state.tipos)

    const [objeto, setObjeto] =useState({
    nombre: '',
    imagen:'',
    vida:'',
    fuerza:'',
    defensa:'',
    velocidad: '',
    altura: '',
    peso: '',
    tipo: [],
    })

    useEffect(()=>{
        dispatch(getTypes())
    }, [dispatch])

    function handleTipos(e){
        if(e.target.checked){
            setObjeto({
                ...objeto,
                tipo: [...objeto.tipo, e.target.value]
            })
        }
        if(!e.target.checked){
            setObjeto({
                ...objeto,
                tipo: objeto.tipo.filter((el)=> e.target.value !== el)
            })
        }
    }

    const nombreValido= /^[a-zA-ZñÑ]+$/i;

    function handleSubmit(e){
        e.preventDefault();
        if(!objeto.nombre || objeto.nombre.length > 20 || !nombreValido.test(objeto.nombre) ) return alert('El nombre es obligatorio, solo puede llevar letras y su largo debe ser menor a 20')
        if(!objeto.vida || objeto.vida <= 0 || objeto.vida > 200) return alert('El campo vida es obligatorio y debe ser mayor a 0 y menor a 200')
        if(!objeto.fuerza || objeto.fuerza <= 0 || objeto.fuerza > 200) return alert('El campo fuerza es obligatorio y debe ser mayor a 0 y menor a 200')
        if(!objeto.defensa || objeto.defensa <= 0 || objeto.defensa > 200) return alert('El campo defensa es obligatorio y debe ser mayor a 0 y menor a 200')
        if(!objeto.velocidad || objeto.velocidad <= 0 || objeto.velocidad > 300) return alert('El campo velocidad es obligatorio y debe ser mayor a 0 y menor a 300')
        if(!objeto.altura ||objeto.altura <= 0 || objeto.altura > 100) return alert('El campo altura es obligatorio y debe ser mayor a 0 y menor a 100')
        if(!objeto.peso || objeto.peso <= 0 || objeto.peso > 1000) return alert('El campo peso es obligatorio y debe ser mayor a 0 y menor a 1000')
        if(objeto.tipo.length === 0 || objeto.tipo.length > 2) return alert('El campo tipos es obligatorio y solo pueden seleccionarse máximo 2 tipos')
        dispatch(postPokemon(objeto));
        alert('¡Pokemon agregado exitosamente!')
        setObjeto('')
    }

    return (
        <div>
            <Link to= '/home'><button className={estilos.btn}>Volver</button></Link>
            <h1 className={estilos.form__title} >¡Crea tu Pokemon!</h1>
            <form onSubmit={handleSubmit} className={estilos.form}>
                <div className={estilos.form__container}>
                    <div className={estilos.form__group}>
                    <input type= 'text'
                        onChange={(e)=>setObjeto({...objeto, nombre: e.target.value.toLowerCase()})}
                            className={estilos.form__input}
                            placeholder=' '
                    />
                    <label className={estilos.form__label}>Nombre:</label>
                    <span className={estilos.form__line} ></span>
                </div>
                <div className={estilos.form__container}>
                    <div className={estilos.form__group}>
                        <input type='url' id='url' name='url'
                            placeholder=' '
                            onChange={(e)=>setObjeto({...objeto, imagen: e.target.value})}
                            className={estilos.form__input}
                        />
                    <label className={estilos.form__label}>Imagen:</label>
                    <span className={estilos.form__line} ></span>
                    </div>
                </div>
                <div className={estilos.form__container}>
                    <div className={estilos.form__group}>
                        <input type='number'
                            placeholder=' '
                            onChange={(e)=>setObjeto({...objeto, vida: e.target.value})}
                            className={estilos.form__input}
                        />
                        <label className={estilos.form__label}>Vida:</label>
                        <span className={estilos.form__line} ></span>
                        </div>
                </div>
                <div className={estilos.form__container}>
                    <div className={estilos.form__group}>
                        <input type='number'
                            placeholder=' '
                            onChange={(e)=>setObjeto({...objeto, fuerza: e.target.value})}
                            className={estilos.form__input}
                            />
                            <label className={estilos.form__label}>Ataque:</label>
                            <span className={estilos.form__line} ></span>
                        </div>
                </div>
                <div className={estilos.form__container}>
                    <div className={estilos.form__group}>
                        <input type='number'
                                placeholder=' '
                                onChange={(e)=>setObjeto({...objeto, defensa: e.target.value})}
                                className={estilos.form__input}
                        />
                        <label className={estilos.form__label}>Ataque:</label>
                        <span className={estilos.form__line} ></span>
                    </div>
                </div>
                <div className={estilos.form__container}>
                    <div className={estilos.form__group}>
                        <input type='number'
                            placeholder="0-300"
                            onChange={(e)=>setObjeto({...objeto, velocidad: e.target.value})}
                            className={estilos.form__input}
                                />
                        <label className={estilos.form__label}>Ataque:</label>
                            <span className={estilos.form__line} ></span>
                            </div>
                    </div>
                </div>
                <div className={estilos.form__container}>
                    <div className={estilos.form__group}>
                        <input type='number'
                            placeholder="0-100"
                            onChange={(e)=>setObjeto({...objeto, altura: e.target.value})}
                            className={estilos.form__input}
                        />
                        <label className={estilos.form__label}>Ataque:</label>
                        <span className={estilos.form__line} ></span>
                        </div>
                </div>
                <div className={estilos.form__container}>
                    <div className={estilos.form__group}>
                    <input type='number'
                    placeholder="0-1000"
                    onChange={(e)=>setObjeto({...objeto,peso: e.target.value})}
                    className={estilos.contenedor}
                        />
                        <label className={estilos.form__label}>Ataque:</label>
                        <span className={estilos.form__line} ></span>
                        </div>
                </div>
                <div className={estilos.cuadro}>
                    <label className={estilos.palabra}>Tipos:</label>
                    {tipos && tipos.map((e, i)=>(
                        <label key={i} className={estilos.palabra} >
                            <input
                            type='checkbox'
                            name={e.name}
                            value={e.name}
                            onChange={handleTipos}
                            />
                            {'   '}
                        </label>
                    ))}
                </div>

                <button type= 'submit' className={estilos.form__submit}>¡Agregar Pokemon!</button>

            </form>
        </div>
    )

}
