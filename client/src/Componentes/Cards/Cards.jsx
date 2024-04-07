

import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import './Cards.css';

function Cards({ allDogs }) {
  const dogsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentDogs, setCurrentDogs] = useState([]);

   useEffect(() => {
     // Verificar si allDogs es un array antes de usar slice
     if (Array.isArray(allDogs)) {
       const startIndex = (currentPage - 1) * dogsPerPage;
       const endIndex = currentPage * dogsPerPage;
       const slicedDogs = allDogs.slice(startIndex, endIndex);
       setCurrentDogs(slicedDogs);
     } else {
       console.error("allDogs no es un array.");
     }
   }, [allDogs, currentPage, dogsPerPage]);



  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className='card-list'>
        {currentDogs.map((d) => (
           <Card dogs={d}/>
          // <Card key={d.id} data={d} />
        ))}
      </div>

      <div className='paginado'>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
        <i className="fa-solid fa-arrow-left"></i>
        </button>
        {Array.from({ length: Math.ceil(allDogs.length / dogsPerPage) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          )
        )}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={
            currentPage === Math.ceil(allDogs.length / dogsPerPage)
          }
        >
      <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </>
  );
}

export default Cards;