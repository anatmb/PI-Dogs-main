import './Landing.css'
import { NavLink } from 'react-router-dom';
import imagen from '../../assets/fondo.png';
function Landing() {


  return (
    <>
      <div className='contenedor'>

        <div className='izquierda_la'>
            <h1 className='titulos'>Si te gusta los perros <i className="fa-solid fa-paw"></i></h1>
            <p className='parrafo'>Aquí conocerás los diferentes tipos de raza y sus caracteristica </p>
            <p className='pie'>Has click aquí para <i className="fa-solid fa-arrow-down"></i></p>
            <NavLink to="/home"><button className='boton'>START</button></NavLink>
            {/* <i class="fa-solid fa-magnifying-glass"></i> */}
            {/* <i class="fa-brands fa-instagram"></i>
            <i class="fa-brands fa-linkedin"></i>
            <i class="fa-brands fa-github"></i> */}
            {/* <i class="fa-solid fa-paw"></i>
            <i class="fa-regular fa-circle-right"></i> */}
        </div>

        <div className='derecha_la'>
         <img className='imagen_fondo' src={imagen } alt="" />

        </div>

      </div>

  
    </>
  )
}

export default Landing