// import React, { useState } from 'react';
import './Home.css';

import { NavLink } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Cards from '../Cards/Cards';
import Filtros from '../Filtros/Filtros';
import { useDispatch, useSelector } from 'react-redux';
// import React, { useEffect} from 'react';
import React, { useState, useEffect } from 'react';
import * as actions from '../../Redux/Actions/index';
const { getDogs } = actions;

function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);
  const filter = useSelector((state) => state.filter);
  // console.log("variablefilter", filter )
  const Dogs = useSelector((state) => state.Dogs)
  // console.log("despuesdefiltrar", Dogs)
  // console.log("lo que llega al home",allDogs )
  const [searchString, setSearchString] = useState("");
  // const dogs = useSelector((state) => state.Dogs);



  function handleChange(e) {
    // se usa para que la maquina no se reenderice
    e.preventDefault()
    // lo que tiene el input
    setSearchString(e.target.value);
  }


  // filtro con EL BACKEND

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(actions.getByName(searchString))

  }

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);


  return (
    <>
      <div className='home'>

        <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />
        <Filtros />
        <Cards allDogs={filter ? Dogs : allDogs} />
    </div >
   
     
    </>
  );
}

export default Home;