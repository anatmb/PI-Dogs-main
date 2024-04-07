
import { GET_DOGS, GET_BY_NAME, FILTERDOGS, GET_TEMPREMENT, FILTER_TEMP, ORDEN_DOGS, ORDEN_DOGS_RAZA, GET_DOGBYID, POST_DOGS } from "../Actions/index";


const initialState = {
  allDogs: [],
  dogsCopy: [],
  Dogs: [],
  Temprement: [],
  busquedaT: [],
  orderedAllDogs: [],
  filter: false,
  // orderAndFilter: { order: "A", tempFilter: "All", originFilter: "all" },
  filtroInicio: false,
  basededato: false,
  api: false,
  estadobd: [],
  estadoapi: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {

    case GET_DOGS:
      return {
        ...state,
        allDogs: action.payload,
        dogsCopy: action.payload,
        Dogs: [],
        filter: false,
        filtroInicio: false,
        basededato: false,
        api: false,
        estadobd: [],
        estadoapi: [],
      };

    case GET_BY_NAME:

      const buscarnombre = action.payload
      if (buscarnombre.length === 0) {
        console.log("no consiguio")
        alert(error.message)
      }
      if (buscarnombre.length !== 0) {
        console.log("consigui algo", buscarnombre.length)
        return {
          ...state,
          Dogs: action.payload,
          filter: true,
          filtroInicio: true,
        }

      }

    case GET_DOGBYID:
      return {
        ...state,
        Dogs: action.payload,
        filter: true,
        filtroInicio: true,
      };

    case FILTERDOGS:
      const Dogs1 = state.allDogs;
      let dogFilter = [];
      if (action.payload === 'DATA_BASE') {
        dogFilter = Dogs1.filter((el) => el.created)
      }
      if (action.payload === 'API') {
        dogFilter = Dogs1.filter((el) => !el.created)
      }
      if (action.payload === 'TODOS') { dogFilter = Dogs1 }

      console.log("que tiene", state.filter)
      console.log("respuesta", dogFilter)

      return {
        ...state,
        Dogs: dogFilter,
        filter: true,
        filtroInicio: true,

      };


    // obtener los temperamento//
    case GET_TEMPREMENT:
      return {
        ...state,
        Temprement: action.payload
      };


    //ordenar por peso 
    case ORDEN_DOGS:

      if (state.filtroInicio === false) {

        let orderedAllDogs = [...state.allDogs];
        console.log("pla", state.allDogs)
        
        const sortedByWeight = [...state.allDogs].sort((a, b) =>
          action.payload === 'peso_Asc' ? parseInt(a.peso.split("-")[0]) - parseInt(b.peso.split("-")[0]) : parseInt(b.peso.split("-")[0]) - parseInt(a.peso.split("-")[0])
        );

        console.log("que retorna", sortedByWeight)
        return {
          ...state,
          Dogs: sortedByWeight,
          filter: true,
          filtroInicio: true,

        };

      } else {


        let orderedAllDogs = [...state.Dogs];
        console.log("pla", state.Dogs)
        const sortedByWeight = [...state.Dogs].sort((a, b) =>
          action.payload === 'peso_Asc' ? parseInt(a.peso.split("-")[0]) - parseInt(b.peso.split("-")[0]) : parseInt(b.peso.split("-")[0]) - parseInt(a.peso.split("-")[0])
        );

        console.log("que retorna", sortedByWeight)
        return {
          ...state,
          Dogs: sortedByWeight,
          filter: true,
          filtroInicio: true,

        };

      }

    /*********ORDENAR POR RAZA*************/
    case ORDEN_DOGS_RAZA:

      if (state.filtroInicio === false) {
        const sortedAlphabetical = [...state.allDogs].sort((a, b) =>
          action.payload === 'Raza_Asc'
            ? a.nombre.localeCompare(b.nombre)
            : b.nombre.localeCompare(a.nombre)
        );
        console.log("que retornaAAAA", sortedAlphabetical)
        return {
          ...state,
          Dogs: sortedAlphabetical,
          filter: true,
          filtroInicio: true,
        };

      } else {
        const sortedAlphabetical = [...state.Dogs].sort((a, b) =>
          action.payload === 'Raza_Asc'
            ? a.nombre.localeCompare(b.nombre)
            : b.nombre.localeCompare(a.nombre)
        );
        console.log("que retornaAAAA", sortedAlphabetical)
        return {
          ...state,
          Dogs: sortedAlphabetical,
          filter: true,
          filtroInicio: true,
        };
      }


    case FILTER_TEMP:

      if (action.payload === "todos") {
        return {
          ...state,
          Dogs: state.allDogs,
          filter: true,
          filtroInicio: true,
        };
      }
      else {
        let filteredDogs = state.allDogs.filter((dog) =>
          dog?.Temperaments?.includes(action.payload))
        return {
          ...state,
          Dogs: filteredDogs,
          filter: true,
          filtroInicio: true,
        }
      }
    default: return state;
  }
}
export default rootReducer;