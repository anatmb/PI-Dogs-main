import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

const Navbar = ({handleChange,handleSubmit}) => {
  return (

    <div className='menu_1'>

        <div className='logo'> 
           <i className="fa-solid fa-paw"></i>
          <button className='botton' > <i className="fa-solid fa-pen-to-square"></i>  < NavLink  to="/formulario" className='lista' >Create</ NavLink ></button>
           <button className='botton' > <i className="fa-solid fa-pen-to-square"></i>  < NavLink  to="/acerca" className='lista' >Acerca</ NavLink ></button>
           <button className='botton' > <i className="fa-solid fa-pen-to-square"></i>  < NavLink  to="/" className='lista' >Inicio</ NavLink ></button>
        </div>
        <div className='search-box'>
            <form onChange={handleChange}>
                <input placeholder='Busqueda'/>
                <button type="submit" onClick={handleSubmit}>   <i className="fa-solid fa-magnifying-glass"></i> </button>
            </form>
        </div>
      
    </div>


  

  )
}

export default Navbar