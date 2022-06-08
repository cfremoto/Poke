const initialState = {
  pokemons: [],
  allPokemons: [],
  tipos: [],
  detail: [],
  delete: ''
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };
    case "GET_TYPES":
      return {
        ...state,
        tipos: action.payload,
      };
    case "FILTER_BY_TYPES":
      const allPokemonsTypes = state.allPokemons;
      const typesFilter =
        action.payload === "All"
          ? allPokemonsTypes && allPokemonsTypes
          : allPokemonsTypes && allPokemonsTypes.filter((e) => e.tipo?.includes(action.payload));
      return {
        ...state,
        pokemons: typesFilter,
      };
    case "GET_NAME_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
      };
    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };
    case "DELETE_POKEMON":
      return {
        ...state,
        delete: action.payload,
      };
    case "CLEAN_DETAIL":
      return {
        ...state,
        detail: {},
      };
    case "FILTER_CREATED":
      const allPokemonsOrigen = state.allPokemons;
      const createdFilter =
        action.payload === "createInDb"
          ? allPokemonsOrigen && allPokemonsOrigen.filter((e) => e.createInDb)
          : allPokemonsOrigen && allPokemonsOrigen.filter((e) => !e.createInDb);
      return {
        ...state,
        pokemons: createdFilter,
      };
    case "ORDER_BY_NAME":
      const sortArr =
        action.payload === "All"
          ? state.allPokemons
          : action.payload === "asc"
          ? state.pokemons && state.pokemons.sort((a, b) => a.nombre.localeCompare(b.nombre))
          : state.pokemons && state.pokemons.sort((a, b) => b.nombre.localeCompare(a.nombre));
      return {
        ...state,
        pokemons: sortArr,
      };
    case "ORDER_BY_STATS":
      const stats = action.payload.split(' ')
      const arrSort =
        stats[0]=== "All"
          ? state.allPokemons
          : stats[1] === "max"
            ? state.pokemons && state.pokemons.sort((a, b) => b[stats[0]] - a[stats[0]])
            : state.pokemons && state.pokemons.sort((a, b) => a[stats[0]] - b[stats[0]])
      console.log(stats)
      return {
        ...state,
        pokemons: arrSort,
      };
    default:
      return state;
  }
}

export default rootReducer;
