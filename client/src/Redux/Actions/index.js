import axios from "axios"
export const GET_DOGS = "GET_DOGS"
export const GET_BY_NAME = "GET_BY_NAME"
export const GET_TEMPREMENT = "GET_TEMPREMENT"
export const FILTERDOGS = "  FILTERDOGS"
export const ORDEN_DOGS = "ORDEN_DOGS"
export const FILTER_TEMP = "FILTER_TEMP"
export const ORDEN_DOGS_RAZA = "ORDEN_DOGS_RAZA"
export const  GET_DOGBYID=" GET_DOGBYID"
export const POST_DOGS="POST_DOGS"

const BASE_URL="https://pi-dogs-main-s3r2.onrender.com"


export function getDogs() {
  return async function (dispatch) {
    const response = await axios(`${BASE_URL}/dogs`);
    // console.log("en action", response.data)
    return dispatch({
      type: "GET_DOGS",
      payload: response.data
    })
  }
}

export function getByName(name) {
  return async function (dispatch) {
    try {
      const response = await axios(`${BASE_URL}/dogs/?name=${name}`);
      return dispatch({
        type: "GET_BY_NAME",
        payload: response.data
      })
      
    } catch (error) {
      
      alert(`No hay perro con el nombre:  ${name} `)
      
    }

  }
}

export const getTemprement = () => {
  try {
    return async function (dispatch) {
      const { data } = await axios.get(`${BASE_URL}/temperamentos`);
      return dispatch({
        type: GET_TEMPREMENT,
        payload: data,
      });
    };
  } catch (error) {
    throw Error(error.message);
  }
};


/*****FILTRADO POR ORIGEN******/

export const getfilterDogs = (temp) => {
  return {
    type: FILTERDOGS,
    payload: temp,
  };
};

/*******FILTRADO POR TEMPERAMENTO*******/

export function filterTemperaments(temp) {
  return {
    type: FILTER_TEMP,
    payload: temp,
  };
}

/*******PARA ORDENAR TODOS LOS PERROS *******/

export const getorderDogs = (order) => {
  return {
    type: ORDEN_DOGS,
    payload: order,
  };
};

/*******FILTRADO POR TEMPERAMENTO*******/

export const getorderDogsRaza = (order) => {
  return {
    type: ORDEN_DOGS_RAZA,
    payload: order,
  };

}

/*******BUSCAR POR id*******/
export const getDogByID = (id) => {
  try {
    return async function (dispatch) {
      const { data } = await axios.get(`${BASE_URL}/dogs/${id}`);
      // console.log("estoy en action", data);
      return dispatch({
        type: GET_DOGBYID,
        payload: data,
      });
    };
  } catch (error) {
    throw Error(error.message);
  }
};

// /******ingresar en la base de dato*******/

// export function postDogs(info){
//   return async function (dispatch) {
//       try {
//           await axios.post('http://localhost:3001/dogs',info)
//           alert('usuario creado correctamente')
//           dispatch({
//               type:POST_DOGS,
//               payload: 'ok'
//           })
//       } catch (error) {
//           alert(error.message)
//       }
//   }
// }
