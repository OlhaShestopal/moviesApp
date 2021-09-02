import React, {useEffect} from 'react';
import {StyleSheet, ScrollView, View, Button, TextInput} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {getMovies, searchData} from '../redux/action';
import {Movie} from '../component/movei';

function List({navigation}) {
  const {token, movies} = useSelector(state => state.moviesReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovies(token));
    console.log('MOVIES ' + movies);
  }, []);

  return (
    <View>
      <TextInput
        placeholder="search..."
        onChangeText={search => dispatch(searchData(movies, token, search))}
      />
      <ScrollView>
        {movies &&
          movies.map((el, index) => {
            return <Movie key={index} data={el} idx={el.id} />;
          })}
      </ScrollView>
      <View>
        <Button
          title="add movie"
          onPress={() => navigation.navigate('AddFilm')}
        />
      </View>
    </View>
  );
}

export {List};
