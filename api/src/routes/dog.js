const { Router } = require('express');
const {getDogsHandler,getDogsByIdHandler,postDogsHandler} = require('../handlers/dogsHandlers')


const dogsRouter = Router();

dogsRouter.get('/',getDogsHandler);
dogsRouter.get('/:id',getDogsByIdHandler);
dogsRouter.post('/',postDogsHandler);


module.exports = dogsRouter;