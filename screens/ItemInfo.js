import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {resetMovie} from '../redux/action';

function ItemInfo({navigation}) {
  const {showMovie} = useSelector(state => state.moviesReducer);
  const dispatch = useDispatch();
  const {title, year, format, actors} = showMovie;

  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      dispatch(resetMovie());
    });
  }, [navigation]);

  return (
    <View>
      <Text>title: {title}</Text>
      <Text>year: {year}</Text>
      <Text>format: {format}</Text>
      <View>
        <Text>actors:</Text>
        {actors.map((el, idx) => {
          return <Text key={idx}>{el.name}</Text>;
        })}
      </View>
    </View>
  );
}

export {ItemInfo};
