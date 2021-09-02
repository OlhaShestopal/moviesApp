import React from 'react';
import {Text, StyleSheet, View, Button} from 'react-native';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import {Input} from '../component/Input';
import {useSelector, useDispatch} from 'react-redux';
import {createSession} from '../redux/action';

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

function Authorization({navigation}) {
  const {token} = useSelector(state => state.moviesReducer);
  const dispatch = useDispatch();

  function handleCreateSession(info) {
    dispatch(createSession(info));
    console.log('DONE user');
  }

  return (
    <View style={styles.loginContainer}>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{email: '', password: ''}}
        onSubmit={values => handleCreateSession(values)}>
        {({handleSubmit, isValid}) => (
          <>
            <Field component={Input} name="email" placeholder="Email Address" />
            <Field
              component={Input}
              name="password"
              placeholder="Password"
              secureTextEntry
            />
            <Button onPress={handleSubmit} title="LOG IN" disabled={!isValid} />
          </>
        )}
      </Formik>
      <View style={styles.registrBlock}>
        <Text style={styles.registrTxt}>Not a member?</Text>
        <Button
          title="Sign up now "
          onPress={() => navigation.navigate('Registration')}
        />
      </View>
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

export {Authorization};
