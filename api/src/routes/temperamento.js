const {Router} = require('express')
const {getTemperamentoHandler} = require('../handlers/temperamentoHandler')

const temperamentoRouter = Router()

temperamentoRouter.get('/',getTemperamentoHandler)

module.exports = temperamentoRouter