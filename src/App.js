/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {Router, Scene, Stack, Actions} from 'react-native-router-flux';
import LoginScreen from './screen/Login';
import ProfileScreen from './screen/Profile';

class App extends React.Component {
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <Router backAndroidHandler={() => Actions.pop()}>
          <Stack key="root" navigationBarStyle={{backgroundColor: Colors.red}}>
            <Scene
              key="login"
              component={LoginScreen}
              initial
              title="Login"
              hideNavBar={true}
            />
            <Scene
              key="profile"
              component={ProfileScreen}
              title="Profile"
              hideNavBar={true}
            />
          </Stack>
        </Router>
      </>
    );
  }
}
export default App;
