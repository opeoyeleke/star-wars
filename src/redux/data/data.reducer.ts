const INITIAL_STATE = {
  people: null,
  planets: null,
  films: null,
  species: null,
  vehicles: null,
  starships: null,
};

const dataReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case "SET_PEOPLE":
      return {
        ...state,
        people: action.payload,
      };
    case "SET_PLANETS":
      return {
        ...state,
        planets: action.payload,
      };
    case "SET_FILMS":
      return {
        ...state,
        films: action.payload,
      };
    case "SET_SPECIES":
      return {
        ...state,
        species: action.payload,
      };
    case "SET_VEHICLES":
      return {
        ...state,
        vehicles: action.payload,
      };
    case "SET_STARSHIPS":
      return {
        ...state,
        starships: action.payload,
      };

    default:
      return state;
  }
};

export default dataReducer;
