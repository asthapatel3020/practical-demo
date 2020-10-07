import React from 'react';
import {View, StyleSheet} from 'react-native';
import Card from '../component/Card';
import LoginBackground from '../component/LoginBackground';
import LoginForm from '../component/LoginForm';

class LoginScreen extends React.Component {
  render() {
    return (
      <View style={style.container}>
        <LoginBackground />
        <View style={style.formContainer}>
          <Card>
            <LoginForm />
          </Card>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center'},
  formContainer: {
    position: 'absolute',
    left: 20,
    right: 20,
  },
});

export default LoginScreen;
