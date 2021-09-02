import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector, useDispatch} from 'react-redux';

import {checkTocken} from './redux/action';
import {Authorization} from './screens/Authorization';
import {Registration} from './screens/Registration';
import {List} from './screens/List';
import {ItemInfo} from './screens/ItemInfo';
import {AddFilm} from './screens/AddFilm';

const Stack = createNativeStackNavigator();

function App() {
  const {token} = useSelector(state => state.moviesReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkTocken());
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token === null ? (
          <>
            <Stack.Screen name="Login Screen" component={Authorization} />
            <Stack.Screen name="Registration" component={Registration} />
          </>
        ) : (
          <>
            <Stack.Screen name="List" component={List} />
            <Stack.Screen name="ItemInfo" component={ItemInfo} />
            <Stack.Screen name="AddFilm" component={AddFilm} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
