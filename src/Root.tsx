import React, { useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Animated
} from "react-native";
import Card from "./Card";

const { height } = Dimensions.get("window");

export default function Root() {
  const animationValue = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.container}>
      {Array.from({ length: 15 }).map((_, i) => {
        const translateValue = animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [i * 2, 50 + i * 10],
          extrapolate: "clamp"
        });
        return (
          <Animated.View
            key={i}
            style={[
              { transform: [{ translateY: translateValue }] },
              StyleSheet.absoluteFill
            ]}
          >
            <Card index={i} />
          </Animated.View>
        );
      })}
      <ScrollView
        style={StyleSheet.absoluteFill}
        // dependent on cards length actually
        contentContainerStyle={{ height: height * 3 }}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                y: animationValue
              }
            }
          }
        ])}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 60
  }
});
