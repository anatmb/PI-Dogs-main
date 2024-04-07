import React from 'react'
import './details.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { NavLink } from 'react-router-dom';
import { getDogByID } from '../../Redux/Actions/index'

const Details = () => {
  const dispatch = useDispatch()
  const { id } = useParams();


  const dog = useSelector((state) => state.Dogs)

  const { nombre, raza, peso, altura, imagen, Temperaments,anosDeVida, created } = dog ;


  console.log("el detalle del perro",dog )

  useEffect(() => {
    dispatch(getDogByID(id))
  }, [id])

  return (

      <div className='container_detalles'>
        <div className='contenedor_detail'>

        <div className='hijo'>
          {/* <h1>Soy detail</h1> */}
          <div className='izquierda1'>
            <img className='imagen1' src={imagen} alt={nombre} />
          </div>
          <div className='derecha1'>
            <p><span className='titulos1' >{nombre}</span></p>
            <h3 className='subtitulo'><i class="fa-solid fa-paw"></i>  Informacion General</h3>

            <p><strong>id: </strong>{id}</p>
            <p><strong>Raza:</strong>{raza}</p>
            <p><strong>Peso:</strong>{peso}</p>
            <p><strong>Años de vida:</strong>{anosDeVida}</p>
            <p><strong>Temperamento: </strong> {Temperaments?.length > 0 ? Temperaments.split(",") : "undifiend"}</p>
            <NavLink to="/home"><button className='boton_detalle'>Home</button></NavLink>
          </div>
        </div>

        </div>

      </div>

  )
}

export default Details