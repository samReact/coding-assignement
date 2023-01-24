import React, { ReactElement } from 'react';
import {StyleSheet, Image, View, StatusBar} from 'react-native';


const logo = require("../assets/logo.jpeg");


export default function Header():ReactElement  {

  return (
    <View style={styles.container}>
      <View style={styles.view}>
            <Image source={logo} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
  },
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: StatusBar.currentHeight
  },
  image: {width: 150, height: 50},
});
