
import React from 'react';
import './Card.css';
import { NavLink } from 'react-router-dom';

function Card({ dogs }) {

  if (!dogs) {
    return null; 
  }

  const {id, nombre, raza, peso, altura, imagen, Temperaments, created } = dogs;

  console.log("aaa", dogs)


  const imageUrl = !created
     ? imagen
  : imagen;

  return (
    <>
      <div className='card-container'>
        <img className='imagen' src={imageUrl} alt={nombre} />
        <div className='card_hover'>
            <p>Nombre: {nombre} </p>
            <p>
             Temperament:{" "}
             {Temperaments?.length > 0 ? Temperaments.split(",") : "undefined"}
            </p>
            <p>Peso: {peso ? ` ${peso} kg `: 'No especificado'} </p>
         

            <NavLink to={`/detail/${id}`}><button className='boton1'><i className="fa-solid fa-eye"></i></button></NavLink>
      </div>
      </div>
    </>
  );
}

export default Card;