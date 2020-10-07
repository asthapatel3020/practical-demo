import React from 'react';
import {View, StyleSheet} from 'react-native';

const LoginBackground = (props) => {
  return (
    <View>
      <View style={style.upBG} />
      {props.children}
      <View style={style.downBG} />
    </View>
  );
};
const style = StyleSheet.create({
  upBG: {height: '30%', backgroundColor: '#FFFFFF'},
  downBG: {height: '70%', backgroundColor: '#F76951'},
});
export default LoginBackground;
