import React, { useRef } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Animated,
  PanResponder,
  View
} from "react-native";
import Card from "./Card";

const TOTAL_CARDS = 15;
export default function Root() {
  const animationValue = useRef(new Animated.Value(0)).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dy }) => {
        console.log(dy);
      }
    })
  ).current;

  animationValue.addListener(v => console.log("AnimationValue: ", v.value));

  return (
    <SafeAreaView style={styles.container}>
      <View
        {...panResponder.panHandlers}
        style={[StyleSheet.absoluteFill, { backgroundColor: "red" }]}
      >
        {Array.from({ length: TOTAL_CARDS }).map((_, i) => {
          const translateValue = animationValue.interpolate({
            inputRange: [0, 1],
            outputRange: [-i * 2, -50 + i * 10],
            extrapolateLeft: "clamp"
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60
  }
});
