const Validation = (data) => {
    let error = {};
    const imageUrlPattern = /^(http(s)?:\/\/)?\S+\.\S+$/;
    if (!/^[a-zA-Z\s]*$/.test(data.nombre) || data.nombre.length < 3) {
      error.nombre = "No debe tener numero, caracteres y una longitud de 3 o más.";
    }
    if (!imageUrlPattern.test(data.imagen)) {
      error.imagen = "La URL de esta imagen no es correcta.";
    }
  
    if (
        data.minWeight < 1 || data.minHeight < 1) {
        error.minHeight = "Debe ser más de 1"
        error.minWeight ="Debe ser más de 1"
      } 
      if(data.maxWeight > 100 || data.maxHeight > 100 ){
        error.maxHeight = "debe ser menos de 100"
        error.maxWeight = "debe ser menos de 100"
      }
      if ( data.anosDeVida < 5) {
      error.anosDeVida = "la vida debe ser mayor de 5";
    }
  
    return error;  
  };
  
  export default Validation;