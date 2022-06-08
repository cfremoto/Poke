import axios from "axios";

export function getPokemons() {
  return async function (dispatch) {
    try {
      const json = await axios.get("http://localhost:3001/pokemon");
      return dispatch({
        type: "GET_POKEMONS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getTypes() {
  return async function (dispatch) {
    //   try {
    //     const json = await axios.get("http://localhost:3001/tipo");
    //     return dispatch({
    //       type: "GET_TYPES",
    //       payload: json.data,
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   }
    //
    await fetch('http://localhost:3001/tipo')
      .then(response => response.json())
      .then(payload => {
        dispatch({
          type: 'GET_TYPES',
          payload
        })
      }).catch(error => console.log(error))
  }
}

export function deletePoke(payload) {
  return async function (dispatch) {
    try {
      const json = await axios.delete('http://localhost:3001/pokemon/' + payload)
      return dispatch({
        type: "DELETE_POKEMON",
        payload: json.data,
      })

    } catch (error) {
      console.log(error)
    }

  }
}

export function postPokemon(payload) {
  return async function (dispatch) {
    try {
      const json = await axios.post("http://localhost:3001/pokemon", payload);
      return dispatch({
        type: "POST_POKEMON",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDetail(payload) {
  return async function (dispatch) {
    try {
      const json = await axios.get("http://localhost:3001/pokemon/" + payload);
      return dispatch({
        type: "GET_DETAIL",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getNamePokemons(payload) {
  return async function (dispatch) {
    try {
      const json = await axios.get(
        "http://localhost:3001/pokemon?name=" + payload);
      return dispatch({
        type: "GET_NAME_POKEMONS",
        payload: json.data,
      });
    } catch (error) {
      alert("No pokemon found with that name");
      console.log(error);
    }
  };
}

export function filterByTypes(payload) {
  return {
    type: "FILTER_BY_TYPES",
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderByStats(payload) {
  return {
    type: "ORDER_BY_STATS",
    payload,
  };
}

export function cleanDetail() {
  return {
    type: "CLEAN_DETAIL",
    payload: {},
  };
}
