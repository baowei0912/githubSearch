import React from 'react';
import UserSearch from './components/UserSearch';
import FollowingsProfile from './components/FollowingsProfile';
import FollowersProfile from './components/FollowersProfile'
import OpenUrlScreen from './components/OpenUrlScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={UserSearch}
          options={{title: 'Welcome to Github Search'}}
        />
        <Stack.Screen name="Followers" component={ FollowersProfile }  />
        <Stack.Screen name="Followings" component={ FollowingsProfile }  />
        <Stack.Screen name="OpenUrl" component={ OpenUrlScreen } />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
