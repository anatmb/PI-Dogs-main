import React, { useState } from 'react';
import './Acerca.css'
import { NavLink } from 'react-router-dom';
import imagen from '../../assets/about.jpg';

function Acerca() {
    return (
        <>
            <div >
                <div className="container">

                    <div className="fondo">

                        <div className="img-box">
                            <img className="perfil" src={imagen} alt="" />
                        </div>
                        <div className='detail-box'>
                            <h2 >
                                Anadeska Meléndez
                            </h2>

                            <div className='icono_padre'>
                                <i className="fa-brands fa-instagram iconos"></i>
                                <i className="fa-brands fa-linkedin iconos"></i>
                                <i className="fa-brands fa-github iconos"></i>
                            </div>
                            <p>
                            Soy una apasionada desarrolladora web con una conexión única entre la tecnología y mi amor 
                            por viajar. Además de codificar, disfruto explorando nuevos lugares con mi hijo, 
                            fusionando mi mundo digital con las maravillas del mundo real. 
                            Mi rol de madre agrega una perspectiva valiosa a mi vida, equilibrando el 
                            código con las alegrías cotidianas.
                        
                            </p>

                        

                            <p>
                       
                            En resumen, soy una viajera, madre entusiasta y amante de la 
                            tecnología que abraza la diversidad de experiencias.
                            </p>
                            <div>

                                <NavLink to="/home"><button className='boton_detalle'>Home</button></NavLink>
                            </div>

                         


                        </div>



                    </div>


                </div>



            </div>





        </>
    );
}

export default Acerca;