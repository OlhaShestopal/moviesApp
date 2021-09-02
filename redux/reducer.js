import {
  CREATE_USER,
  CHECK_TOKEN,
  CREATE_SESSION,
  GET_MOVIES,
  CHOOSE_MOVIE,
  RESET_MOVIE,
  DELETE_MOVIE,
  ADD_MOVIE,
  SEARCH_DATA,
} from './action';

const initialState = {
  token: null,
  movies: [],
  showMovie: null,
};

function moviesReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_USER:
      return {...state, token: action.payload};
    case CHECK_TOKEN:
      return {...state, token: action.payload};
    case CREATE_SESSION:
      return {...state, token: action.payload};
    case GET_MOVIES:
      return {...state, movies: action.payload};
    case CHOOSE_MOVIE:
      return {...state, showMovie: action.payload};
    case RESET_MOVIE:
      return {...state, showMovie: null};
    case DELETE_MOVIE:
      return {...state, movies: action.payload};
    case ADD_MOVIE:
      return {...state};
    case SEARCH_DATA:
      return {...state, movies: action.payload};

    default:
      return state;
  }
}

export default moviesReducer;
