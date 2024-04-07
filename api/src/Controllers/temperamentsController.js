const { Temperaments } = require('../db')
const axios = require('axios')

///usar un bulk create para los type de la api la primera vez, ya despues utilizar la base de datos con un find 
const getTemperaments = async () => {
  const typesdb = await Temperaments.findAll()
  if (typesdb.length) {
    return typesdb
  } else {

    const response = await axios.get('https://api.thedogapi.com/v1/breeds');
    const breeds = response.data;
    // console.log(breeds)


    // Extraer y almacenar temperamentos en la base de datos
    const allTemperaments = breeds.flatMap((breed) => {
      // La propiedad 'temperament' puede contener una lista de temperamentos separados por comas
      const breedTemperaments = breed.temperament ? breed.temperament.split(',').map((t) => t.trim()) : [];
      // console.log(breedTemperaments)
      return breedTemperaments;
    });

    // Utilizar Set para eliminar duplicados
    const uniqueTemperaments = [...new Set(allTemperaments)];

    // Almacenar temperamentos en la base de datos
    const createdTemperaments = await Promise.all(
      uniqueTemperaments.map((temperament) =>
        Temperaments.findOrCreate({
          where: { nombre: temperament },
        })
      )
    );

    // Obtener solo los nombres de los temperamentos creados (filtrando los nulos)
    const storedTemperaments = createdTemperaments
      .filter(([, created]) => created) // Filtrar solo los temperamentos creados
      .map(([temperament]) => temperament.nombre);

    // res.json({ temperaments: storedTemperaments });
    return { temperaments: storedTemperaments };
  }
}

module.exports = {
  getTemperaments
}