const {getTemperaments} = require('../Controllers/temperamentsController')

const getTemperamentoHandler = async (req,res)=>{
     try {
     const tem = await getTemperaments()
    //  res.setHeader('Cache-Control', 'no-store');
    //  res.setHeader('Pragma', 'no-cache');
    //  res.setHeader('Expires', '0');
         res.status(200).json(tem)
     } catch (error) {
         res.status(400).json({error: error.message})
     }
}

module.exports = {
    getTemperamentoHandler
}