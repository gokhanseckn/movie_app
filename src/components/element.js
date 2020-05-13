import React from 'react';
import { StyleSheet, Text } from 'react-native';

const Element = props => (
  <Text
    {...props}
    style={[
      { fontWeight: props.bold && 'bold' },
      styles.defaultStyle,
      props.style,
    ]}>
    {props.children}
  </Text>
);

const styles = StyleSheet.create({
  defaultStyle: {
    fontSize: 16,
    fontFamily: 'Georgia',
  },
});

export default Element;
