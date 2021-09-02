import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import {useSelector, useDispatch} from 'react-redux';

import {Input} from '../component/Input';
import {addMovie} from '../redux/action';

const signUpValidationSchema = yup.object().shape({
  title: yup.string().required('Full name is required'),
  year: yup
    .string()
    .matches(/(\d){4}\b/, 'Enter a valid year')
    .required('Year is required'),
  format: yup
    .string()
    .oneOf(
      ['VHS', 'DVD', 'Blu-Ray'],
      'Enter a valid format: VHS, DVD or Blu-Ray',
    )
    .required('Format is required'),
  actors: yup.string().required('Actors are required'),
});

function AddFilm({navigation}) {
  const {token} = useSelector(state => state.moviesReducer);
  const dispatch = useDispatch();
  function handleAddMovie(info) {
    dispatch(addMovie(info, token));
    navigation.navigate('List');
  }
  return (
    <View style={styles.loginContainer}>
      <Text> add information about new movie:</Text>
      <Formik
        validationSchema={signUpValidationSchema}
        initialValues={{
          title: '',
          year: '',
          format: '',
          actors: '',
        }}
        onSubmit={values => handleAddMovie(values)}>
        {({handleSubmit, isValid}) => (
          <>
            <Field component={Input} name="title" placeholder="title" />
            <Field component={Input} name="year" placeholder="year" />
            <Field component={Input} name="format" placeholder="format" />
            <Field component={Input} name="actors" placeholder="actors" />
            <Button
              onPress={handleSubmit}
              title="ADD MOVIE"
              disabled={!isValid}
            />
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    padding: '10%',
    backgroundColor: '#e6e6e6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registrBlock: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  registrTxt: {
    color: 'grey',
    fontWeight: 'bold',
    marginRight: 10,
  },
});

export {AddFilm};
