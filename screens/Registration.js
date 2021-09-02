import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {Formik, Field} from 'formik';
import {useSelector, useDispatch} from 'react-redux';
import * as yup from 'yup';
import {createUser} from '../redux/action';

import {Input} from '../component/Input';

const signUpValidationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/(\w.+\s).+/, 'Enter at least 2 names')
    .required('Full name is required'),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email is required'),
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .matches(
      /[!@#$%^&*()\-_"=+{}; :,<.>]/,
      'Password must have a special character',
    )
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
});

function Registration() {
  const {token} = useSelector(state => state.moviesReducer);
  const dispatch = useDispatch();

  function handleCreateUser(info) {
    dispatch(createUser(info));
  }

  return (
    <View style={styles.loginContainer}>
      <Formik
        validationSchema={signUpValidationSchema}
        initialValues={{
          email: '',
          name: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={values => handleCreateUser(values)}>
        {({handleSubmit, isValid}) => (
          <>
            <Field
              component={Input}
              name="email"
              placeholder="Email Address"
              keyboardType="email-address"
            />
            <Field component={Input} name="name" placeholder="Full Name" />

            <Field
              component={Input}
              name="password"
              placeholder="Password"
              secureTextEntry
            />
            <Field
              component={Input}
              name="confirmPassword"
              placeholder="Confirm Password"
              secureTextEntry
            />

            <Button
              onPress={handleSubmit}
              title="SIGN UP"
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
  textInput: {
    height: 40,
    width: '100%',
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
});

export {Registration};
