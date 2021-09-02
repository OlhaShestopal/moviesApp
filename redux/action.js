import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CREATE_USER = 'CREATE_USER';
export const CREATE_SESSION = 'CREATE_SESSION';
export const CHECK_TOKEN = 'CHECK_TOKEN';

export const GET_MOVIES = 'GET_MOVIES';
export const CHOOSE_MOVIE = 'CHOOSE_MOVIE';
export const RESET_MOVIE = 'RESET_MOVIE';
export const DELETE_MOVIE = 'DELETE_MOVIE';
export const ADD_MOVIE = 'ADD_MOVIE';
export const SEARCH_DATA = 'SEARCH_DATA';

const API_USER = 'http://10.0.2.2:8000/api/v1/users';
const API_SESSION = 'http://10.0.2.2:8000/api/v1/sessions';
const API_MOVIES = 'http://10.0.2.2:8000/api/v1/movies';

export const createUser = data => {
  console.log(data);
  try {
    return async dispatch => {
      const res = await fetch(API_USER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const response = await res.json();
      if (response.token) {
        AsyncStorage.setItem('@token', response.token);
        dispatch({
          type: CREATE_USER,
          payload: response.token,
        });
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {
    Alert.alert('Error with autorization');
  }
};

export const createSession = data => {
  try {
    return async dispatch => {
      const res = await fetch(API_SESSION, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const response = await res.json();
      if (response.token) {
        AsyncStorage.setItem('@token', response.token);
        dispatch({
          type: CREATE_SESSION,
          payload: response.token,
        });
      } else {
        Alert.alert('Error with registration');
      }
    };
  } catch (error) {
    Alert.alert('Error with registration');
  }
};

export const checkTocken = () => {
  try {
    return async dispatch => {
      const value = await AsyncStorage.getItem('@token');
      if (value) {
        dispatch({
          type: CHECK_TOKEN,
          payload: value,
        });
      }
    };
  } catch (e) {}
};

export const getMovies = token => {
  try {
    return async dispatch => {
      const res = await fetch(API_MOVIES, {
        method: 'GET',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });
      const response = await res.json();
      if (response.data) {
        dispatch({
          type: GET_MOVIES,
          payload: response.data,
        });
      } else {
        Alert.alert('Error with load movies');
      }
    };
  } catch (error) {
    Alert.alert('Error with load movies');
  }
};

export const chooseMovie = (id, token) => {
  console.log('action choose ' + id);
  try {
    return async dispatch => {
      const res = await fetch(`${API_MOVIES}/${id}`, {
        method: 'GET',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });

      const response = await res.json();
      if (response.data) {
        dispatch({
          type: CHOOSE_MOVIE,
          payload: response.data,
        });
      } else {
        Alert.alert('Error with load movies');
      }
    };
  } catch (error) {
    Alert.alert('Error with load movies');
  }
};

export const resetMovie = () => dispatch => {
  dispatch({
    type: RESET_MOVIE,
    payload: null,
  });
};

export const deleteMovie = (state, token, id) => {
  const newMovies = state.filter(el => el.id != id);
  console.log('newMovies ' + newMovies);
  try {
    return async dispatch => {
      const res = await fetch(`${API_MOVIES}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });
      const response = await res.json();
      console.log(response);
      if (response) {
        dispatch({
          type: DELETE_MOVIE,
          payload: newMovies,
        });
      } else {
        Alert.alert('Error with delete movie');
      }
    };
  } catch (error) {
    Alert.alert('Error with delete movie');
  }
};

export const addMovie = (data, token) => {
  const actorsArr = data.actors.split(',');
  console.log('actorsArr' + actorsArr);
  data.actors = actorsArr;
  try {
    return async dispatch => {
      const res = await fetch(API_MOVIES, {
        method: 'POST',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const response = await res.json();
      console.log(response);
      if (response) {
        dispatch({
          type: ADD_MOVIE,
        });
      } else {
        Alert.alert('Error with delete movie');
      }
    };
  } catch (error) {
    Alert.alert('Error with delete movie');
  }
};

export const searchData = (state, token, value) => {
  try {
    return async dispatch => {
      const res = await fetch(
        `${API_MOVIES}?search=${value}&limit=10&offset=0`,
        {
          method: 'GET',
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      );
      const response = await res.json();
      console.log(response);
      if (response.data) {
        dispatch({
          type: SEARCH_DATA,
          payload: response.data,
        });
      } else {
        Alert.alert('Error with search movie');
      }
    };
  } catch (error) {
    Alert.alert(error);
  }
};
