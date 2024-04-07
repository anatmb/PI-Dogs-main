const { getAllDogs, getDogById, getDogsByName, postDogs } = require('../Controllers/dogsController')


const getDogsHandler = async (req, res) => {
    // console.log("entro aqui");
    const { name } = req.query
    try {
        if (name) {
            console.log(name);
            const response = await getDogsByName(name)
            console.log("response", response)
             res.setHeader('Cache-Control', 'no-store');
             res.setHeader('Pragma', 'no-cache');
             res.setHeader('Expires', '0');
            return res.status(200).json(response)
        }
        const response = await getAllDogs()
        console.log("no retorna ojitos", response);
        res.setHeader('Cache-Control', 'no-store');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error: error.message })
        console.log(" error 400");
    }
}

const getDogsByIdHandler = async (req, res) => {
    const { id } = req.params;
    const source = isNaN(id) ? "db" : "api";
    try {
        const response = await getDogById(id, source)
        // console.log("error aqui")
        // res.setHeader('Cache-Control', 'no-store');
        // res.setHeader('Pragma', 'no-cache');
        // res.setHeader('Expires', '0');
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error: error.message })
        // console.log("vamos")
    }
}

const postDogsHandler = async (req, res) => {
    console.log("pasando")
    const { nombre, altura, peso, anosDeVida, imagen, raza, temperaments } = req.body
    console.log("lo que recibo", nombre, altura, peso, anosDeVida, imagen, raza, temperaments)
    try {
        const response = await postDogs(nombre, altura, peso, anosDeVida, imagen, raza, temperaments)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


module.exports = {
    getDogsHandler,
    getDogsByIdHandler,
    postDogsHandler,
}