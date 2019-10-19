import React from "react";
import { View, StyleSheet, Text } from "react-native";

const Card = () => {
  return (
    <View style={[styles.container]}>
      <View style={[styles.url]}>
        <Text>http://instagram.com/ankeetmaini</Text>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    height: 300,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    ...StyleSheet.absoluteFillObject
  },
  url: {
    borderColor: "#afafaf",
    borderWidth: 1,
    height: 30,
    padding: 8
  }
});
