
import './formulario.css'
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getTemprement } from "../../Redux/Actions/index";
import Validation from "./Validation";
import React, { useState, useEffect } from "react";

import axios from "axios";

const Formulario = () => {

  const temprementos = useSelector((state) => state.Temprement);
  // console.log("que trae de temperamento", temprementos)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTemprement());
  }, [dispatch]);

  const [message, setMessage] = useState("");

  const [create, setCreate] = useState({
    nombre: "",
    imagen: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    anosDeVida: "",
    raza: "",
    temperament: [],

  });
  const [error, setError] = useState({

    nombre: "",
    imagen: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    anosDeVida: "",
    raza: "",
    temperament: [],
  });


  const changeHandler = (event) => {
    const property = event.target.name;
    const { value, checked } = event.target;

    if (property === "temperament") {
      if (checked) {
        setCreate({
          ...create,
          temperament: [...create.temperament, value]
        })

      } else {
        setCreate({
          ...create,
          temperament: [...create.temperament.filter(i => i !== value)]
        })
      }
    } else {
      setCreate({
        ...create,
        [property]: value
      });
    };
    setError(
      Validation({
        ...create,
        [property]: value
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !create.nombre ||
      !create.temperament.length === 0 ||

      !create.anosDeVida
    ) {
      alert("Te falta campos obligatorios");
      return;
    }

    console.log("aqui estamos 1111111111111")


    if (!error.length) {
      try {
        let newDog = {
          nombre: create.nombre,
          imagen: create.imagen,
          peso: `${create.minWeight} - ${create.maxWeight}`,
          altura: `${create.minHeight} - ${create.maxHeight}`,
          anosDeVida: create.anosDeVida,
          raza: create.raza,
          temperaments: create.temperament,
        };

        console.log("entramos al try", newDog)

        const response = await axios.post("http://localhost:3001/dogs", newDog);

        console.log("response", response.date)
        if (response.status === 200) {
          setMessage("¡you had create a new Dog!");

          setCreate({
            nombre: "",
            imagen: "",
            minHeight: "",
            maxHeight: "",
            minWeight: "",
            maxWeight: "",
            anosDeVida: "",
            raza: "",
            temperament: [],
          });
        }
      } catch (error) {
        console.error("Error al enviar los datos al servidor:", error);
        setMessage("Hay un problema al enviar la información al servidor..", error);
      }
    }
  };

  return (
    <div className='imagen_fondo1'>
      <div className="formContainer">


        <h3 className='titulos11'>Creando un nuevo perrito!!!</h3>
        {/* <img className='imagen_fondo1' src={imagen } alt="" /> */}

        <form onSubmit={handleSubmit} className="create">


          <div className='izquierda'>

            <div class="form-group">

              <label className='titulo_form'> Nombre: </label>
              <input type="text" name="nombre" value={create.nombre} onChange={changeHandler} placeholder="Nombre del perro" />
              <br />
              {error.nombre && <span className='titulo_form'>{error.nombre}</span>}
            </div>


            <div class="form-group">
              <label className='titulo_form'>Imagen: </label>
              <input type="text" name="imagen" value={create.imagen} onChange={changeHandler} placeholder="URL de la imagen del perro" />
              <br />
              {error.imagen && <span className='titulo_form'>{error.imagen}</span>}
            </div>

            <div class="form-group">
              <label className='titulo_form'>
                Altura Min:    </label>
              <input
                type="number"
                name="minHeight"
                value={create.minHeight}
                onChange={changeHandler}
                placeholder="Altura Minima"
              />
              {error.minHeight && <span className='titulo_form'>{error.minHeight}</span>}
            </div>


            <div class="form-group">


              <label className='titulo_form'>
                Altura Max:  </label>
              <input
                type="number"
                name="maxHeight"
                value={create.maxHeight}
                onChange={changeHandler}
                placeholder="Maxim Height"
              />
              {error.maxHeight && <span className='titulo_form'>{error.maxHeight}</span>}
            </div>


            <div class="form-group">

              <label className='titulo_form'>
                Peso Min:  </label>
              <input
                type="number"
                name="minWeight"
                value={create.minWeight}
                onChange={changeHandler}
                placeholder="Peso Min"
              />
              {error.minWeight && <span className='titulo_form'>{error.minWeight}</span>}

            </div>

            <div class="form-group">
              <label className='titulo_form'>
                Peso Max: </label>
              <input
                type="number"
                name="maxWeight"
                value={create.maxWeight}
                onChange={changeHandler}
                placeholder="Peso Max"
              />
              {error.maxWeight && <span className='titulo_form'>{error.maxWeight}</span>}
            </div>




            <div class="form-group">
              <label className='titulo_form'>
                anosDeVida: </label>
              <input
                type="number"
                name="anosDeVida"
                value={create.anosDeVida}
                onChange={changeHandler}
                placeholder="Años de vida"
              />
              {error.anosDeVida && <span className='titulo_form'>{error.anosDeVida}</span>}
            </div>


        

          </div>

          <div className='derecha'>
<div class="form-group">


<label className='titulo_form'>
  grupos-raza:  </label>
<input
  type="text"
  name="raza"
  value={create.raza}
  onChange={changeHandler}
  placeholder="Raza"
/>
{error.raza && <span className='titulo_form'>{error.anosDeVida}</span>}
</div>


            <div className='checkbox_selecion'>
              <label>Temperamentos:</label>
              <div className="checkbox-container">
                {temprementos.map((temprem) => (
                  <div key={temprem.id} className="checkbox-item">
                    <input
                      type="checkbox"
                      name="temperament"
                      value={temprem.nombre}
                      checked={create.temperament.includes(temprem.nombre)}
                      onChange={changeHandler}
                    />
                    <label>{temprem.nombre}</label>
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="loginButton">Create Dog</button>
            {message && <div className="message">{message}</div>}
            
              <NavLink to="/home">
                <button className="loginButton">Home</button>
              </NavLink>
            
          </div>
        </form>
      </div>
    </div>
  )
}


export default Formulario