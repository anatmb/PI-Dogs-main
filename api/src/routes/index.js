const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogsRouter = require('./dog')
const temperamentosRouter = require('./temperamento')
// aqui va a seguir leyendo la url que estoy ocupando en de que mi end point continue en este caso
// con dogs voy a leer lo que se encuente en mi archivo dogsRouter

const router = Router();
router.use('/dogs', dogsRouter)
router.use('/temperamentos', temperamentosRouter)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
