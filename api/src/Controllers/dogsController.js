const { Dog, Temperaments } = require('../db');
const { Op } = require('sequelize');
const axios = require('axios');
const { API_KEY } = process.env;


const getDogById = async (id, source) => {
     console.log("lo que recibe detail", id)


    let dogApi;
    const response =
        source === "api"
            ? await axios.get(`https://api.thedogapi.com/v1/breeds/${id}?api_key=${API_KEY}`)
            : await Dog.findOne({ where: { id }, include: Temperaments });

          
    if (source === "api") {
        // const apiDataid = response.data;
         const apiDataid = [response.data];
        
        console.log("lo que hay en detalle", apiDataid)

        const apiDogsid = await Promise.all(apiDataid.map(async (apiDogid) => {
            const imageResponse = await axios.get(`https://api.thedogapi.com/v1/images/${apiDogid.reference_image_id}`);
            const image = {
                id: imageResponse.data.id,
                width: imageResponse.data.width,
                height: imageResponse.data.height,
                url: imageResponse.data.url
            };

            return { ...apiDogid, image };
        }));
        const dogsApiid = cleanArray(apiDogsid);
        console.log("fff",  dogsApiid)
            return  dogsApiid[0]   
    }
    else {
      
        const temperamentsNames1 = response.temperaments.map(temp => temp.nombre);
        return {
            id: response.id,
            nombre: response.nombre,
            raza: response.raza,
            altura: response.altura,
            peso: response.peso,
            anosDeVida: response.anosDeVida,
            imagen: response.imagen,
            Temperaments: temperamentsNames1.join(', '),
            created: true
        }
    }
}

//se va a ejecutar no que se encuentre en la req

const getDogsByName = async (name) => {
    console.log("estoy en buscar por nombre", name);

    try {
        const response = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`);

        console.log("Respuesta de la API:", response);
        const apiData = response.data;

        const apiDogs = await Promise.all(apiData.map(async (apiDog) => {
            const imageResponse = await axios.get(`https://api.thedogapi.com/v1/images/${apiDog.reference_image_id}`);
            const image = {
                id: imageResponse.data.id,
                width: imageResponse.data.width,
                height: imageResponse.data.height,
                url: imageResponse.data.url
            };

            return { ...apiDog, image };
        }));

        const dogsApinombre = cleanArray(apiDogs);

        const dogDb = await Dog.findAll({
            where: { nombre: { [Op.iLike]: `%${name}%` } },
            limit: 15,
            include: {
                model: Temperaments,
                attributes: ["nombre"],
            },
        });

        const dogDb1 = cleanArray1(dogDb);
        console.log("tengo en mi api", apiDogs.length);

        if (!apiDogs.length) {
            return [...dogDb1];
        } else {
            return [...dogsApinombre, ...dogDb1];
        }
    } catch (error) {
        console.error("Error en la solicitud de la API:", error);
        return [];
    }
}

const getAllDogs = async () => {
    //  console.log("estoy en el controller de imprimir todos")
    try {
        const dogsDb = await Dog.findAll(
            {
                include: [{ model: Temperaments, attributes: ['nombre'] }]
            });


        const dogsTemperaments = dogsDb.map(dog => {
            const temperamentsNames = dog.temperaments.map(temp => temp.nombre);
            return {
                id: dog.id,
                nombre: dog.nombre,
                raza: dog.raza,
                altura: dog.altura,
                peso: dog.peso,
                anosDeVida: dog.anosDeVida,
                imagen: dog.imagen,
                Temperaments: temperamentsNames.join(', '),
                created: true
            };
        });
        // console.log("convierte", dogsTemperaments)
        const infoApi = (
            await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        ).data;

        const dogsApi = cleanArray(infoApi);

        console.log("revisar",dogsApi )
        return [...dogsApi, ...dogsTemperaments];
    } catch {
        throw new Error("no information");
    }
};

const cleanArray = (arr) => {
    return arr.map((elem) => {
        console.log("Info del perro:", elem);
      return {
        id: elem.id,
        nombre: elem.name,
        raza: elem.breed_group,
        altura: elem.height.metric,
        peso: elem.weight.metric,
        anosDeVida: elem.life_span,
        imagen: elem.image.url,
        Temperaments: typeof elem.temperament === 'string'
          ? elem.temperament.trim()
          : '',
        created: false,
      };
    });
  };

const cleanArray1 = (arr) => {
  return arr.map(dog => {
        const temperamentsNames = dog.temperaments.map(temp => temp.nombre);
        return{
            id: dog.id,
            nombre: dog.nombre,
            raza: dog.raza,
            altura: dog.altura,
            peso: dog.peso,
            anosDeVida: dog.anosDeVida,
            imagen: dog.imagen,
            Temperaments: temperamentsNames.join(', '),
            created: true};
    });

};

const postDogs = async (nombre, altura, peso, anosDeVida, imagen, raza, temperaments) => {
    // console.log("lo que recibo", nombre, altura, peso, anosDeVida, imagen, raza, temperaments)
    try {
        if (!temperaments.length) {
            throw new Error("Tienes que elegir al menos un temperamento.");
        }

        const existingDog = await Dog.findOne({ where: { nombre } });
        if (existingDog) {
            throw new Error("Ya existe un perro con el mismo nombre");
        }

        const temperament = await Temperaments.findAll({
            where: { nombre: temperaments },
        });

        const newDog = await Dog.create({
            nombre,
            raza,
            peso,
            altura,
            anosDeVida,
            imagen,
            Temperaments,
        });

        await newDog.addTemperaments(temperament);
        return newDog;
    } catch (error) {
        throw new Error("No se pudo crear el perro");
    }

};

module.exports = { postDogs, getAllDogs, getDogsByName, getDogById }
