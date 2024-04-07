
import React, { useState, useEffect } from 'react';
import './Filtros.css';
import { useDispatch, useSelector } from "react-redux";
import {
  getfilterDogs,
  getorderDogs,
  getorderDogsRaza,
  filterTemperaments,
  getTemprement,
} from "../../Redux/Actions/index";

function Filtros({ dogs }) {
  const dispatch = useDispatch();
  const temprementos = useSelector((state) => state.Temprement);

  useEffect(() => {
    dispatch(getTemprement());
  }, []);

  const handlerFilterDogs = (event) => {
    // console.log("que escoje", event.target.value)
    dispatch(getfilterDogs(event.target.value));
  };
  const handlerFilterTemprement = (event) => {
    // console.log("escoje t", event.target.value)
    dispatch(filterTemperaments(event.target.value));

  };

  const handlerOrdenDogs = (event) => {
    dispatch(getorderDogs(event.target.value));
  };

  const  handlerOrdenDogsRaza= (event) => {
    dispatch(getorderDogsRaza(event.target.value));
  };
  return (
    <>
      <div>
        <div className="cardsContainer">

          <select onChange={handlerFilterDogs}>
            <option value='' disabled selected >Origen</option>
            <option value="TODOS">TODOS</option>
            <option value="DATA_BASE">DATA BASE</option>
            <option value="API">API</option>
          </select>


          <div>
             <select onChange={e => handlerFilterTemprement(e)}> 
               <option value='' disabled selected >Temperamentos</option> 
              <option value='todos'>Todos</option>
              {temprementos && temprementos.map((t) => (
                <option key={t.id} value={t.name}> {t.nombre} </option>
              ))}
            </select>
          </div>

          <div>
            <select onChange={e => handlerOrdenDogs(e)}>
              <option value='' disabled selected >Peso</option>
              <option value="peso_Asc">Peso Ascendente</option>
              <option value="peso_Desc">Peso Descendente</option>
            </select>
          </div>

          <div>
            <select onChange={e => handlerOrdenDogsRaza(e)} >
              <option value='' disabled selected >Raza</option>
              <option value="Raza_Asc">Raza A-Z</option>
              <option value="Raza_Desc">Raza Z-A</option>
            </select>
          </div>


        </div>
      </div>
    </>
  );
}

export default Filtros;