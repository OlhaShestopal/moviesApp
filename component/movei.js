import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

import {chooseMovie, deleteMovie} from '../redux/action';

function Movie({data, idx}) {
  const {token, movies, showMovie} = useSelector(state => state.moviesReducer);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleOpen = id => {
    dispatch(chooseMovie(id, token));

    if (showMovie) {
      navigation.navigate('ItemInfo');
    }
  };

  const handleDeleteElement = id => {
    const index = id + 1;

    dispatch(deleteMovie(movies, token, id));
    console.log(`delete ${index}`);
    console.log(movies);
  };

  return (
    <TouchableOpacity
      style={styles.movieContainer}
      id={idx}
      onPress={() => handleOpen(idx)}>
      <Text style={styles.title}>{data.title}</Text>
      <TouchableOpacity onPress={() => handleDeleteElement(idx)}>
        <Image
          source={require('../assets/image/icon-del.png')}
          style={styles.iconDelete}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  movieContainer: {
    width: '100%',
    height: 50,
    backgroundColor: 'grey',
    opacity: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    marginLeft: 5,
    marginBottom: 5,
    marginRight: 5,
  },
  title: {
    fontWeight: 'bold',
  },
  iconDelete: {
    width: 40,
    height: 40,

    //    backgroundColor: 'red'
  },
});

export {Movie};
