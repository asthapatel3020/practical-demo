import React from 'react';
import {View, StyleSheet} from 'react-native';

const Card = (props) => {
  return <View style={style.boxSha}>{props.children}</View>;
};

const style = StyleSheet.create({
  boxSha: {
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 7,
    padding: 10,
  },
});

export default Card;
