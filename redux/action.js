import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {request} from '../api/request';

export const CREATE_USER = 'CREATE_USER';
export const CREATE_SESSION = 'CREATE_SESSION';
export const CHECK_TOKEN = 'CHECK_TOKEN';

export const GET_MOVIES = 'GET_MOVIES';
export const CHOOSE_MOVIE = 'CHOOSE_MOVIE';
export const RESET_MOVIE = 'RESET_MOVIE';
export const DELETE_MOVIE = 'DELETE_MOVIE';
export const ADD_MOVIE = 'ADD_MOVIE';
export const SEARCH_DATA = 'SEARCH_DATA';

const API_LINK = 'http://10.0.2.2:8000/api/v1/';
const API_USER = 'http://10.0.2.2:8000/api/v1/users';
const API_SESSION = 'http://10.0.2.2:8000/api/v1/sessions';
const API_MOVIES = 'http://10.0.2.2:8000/api/v1/movies';
const SORT_MOVIES = 'http://10.0.2.2:8000/api/v1/movies?sort=title&order=DESC';

export const createUser = data => {
  try {
    return async dispatch => {
      const response = await request({
        url: API_USER,
        method: 'POST',
        body: data,
      });
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
      const response = await request({
        url: API_SESSION,
        method: 'POST',
        body: data,
      });
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

export const getMovies = tokenValue => {
  try {
    return async dispatch => {
      const response = await request({
        url: SORT_MOVIES,
        method: 'GET',
        token: tokenValue,
      });
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

export const chooseMovie = (id, tokenValue) => {
  try {
    return async dispatch => {
      const response = await request({
        url: `${API_MOVIES}/${id}`,
        method: 'GET',
        token: tokenValue,
      });
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

export const deleteMovie = (state, tokenValue, id) => {
  const newMovies = state.filter(el => el.id != id);
  console.log('newMovies ' + newMovies);
  try {
    return async dispatch => {
      const response = await request({
        url: `${API_MOVIES}/${id}`,
        method: 'DELETE',
        token: tokenValue,
      });
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

export const addMovie = (data, tokenValue) => {
  const actorsArr = data.actors.split(',');
  data.actors = actorsArr;
  try {
    return async dispatch => {
      const response = await request({
        url: API_SESSION,
        method: 'POST',
        token: tokenValue,
        body: data,
      });
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

export const searchData = (state, tokenValue, value) => {
  const url = `${API_MOVIES}?search=${value}`;
  console.log('value.langht ' + value.length);
  console.log('value ' + typeof value);
  let response;

  try {
    return async dispatch => {
      response = await request({
        url: url,
        method: 'GET',
        token: tokenValue,
      });
      console.log('MAX');
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
  try {
    return async dispatch => {
      response = await request({
        url: url,
        method: 'GET',
        token: tokenValue,
      });
      console.log('MAX');
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
