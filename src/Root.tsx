import React, { useRef, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Animated,
  PanResponder,
  View
} from "react-native";
import Card from "./Card";

const TOTAL_CARDS = 15;
const DRAG_AMOUNT = 100;
const CARDS_ARRAY = Array.from({ length: TOTAL_CARDS }).fill(0);
const SHADOW_AMOUNT = 10;

const getRange = (
  length: number,
  i: number,
  position: "first" | "last" | "middle"
) => {
  const highestIndex = length - 1;
  if (position === "first") {
    return {
      inputRange: [0, 0],
      outputRange: [SHADOW_AMOUNT, SHADOW_AMOUNT]
    };
  }
  if (position === "last") {
    return {
      inputRange: [0, (SHADOW_AMOUNT + DRAG_AMOUNT) * i],
      outputRange: [i * SHADOW_AMOUNT, (SHADOW_AMOUNT + DRAG_AMOUNT) * i]
    };
  }

  return {
    inputRange: [
      0,
      (highestIndex - i) * (SHADOW_AMOUNT + DRAG_AMOUNT),
      highestIndex * (SHADOW_AMOUNT + DRAG_AMOUNT)
    ],
    outputRange: [
      i * SHADOW_AMOUNT,
      i * SHADOW_AMOUNT,
      i * (SHADOW_AMOUNT + DRAG_AMOUNT)
    ]
  };
};

export default function Root() {
  const animationValue = useRef(new Animated.Value(0)).current;
  let _startPanY = useRef(0).current;
  let totalPanY = useRef(0).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (_, { y0 }) => {
        _startPanY = y0;
      },
      onPanResponderMove: (_, { moveY }) => {
        totalPanY += moveY - _startPanY;
        _startPanY = moveY;
        animationValue.setValue(totalPanY);
      }
    })
  ).current;
  return (
    <SafeAreaView style={styles.container}>
      <View {...panResponder.panHandlers} style={[StyleSheet.absoluteFill]}>
        {CARDS_ARRAY.map((_, i) => {
          const label =
            i === 0 ? "first" : i === TOTAL_CARDS - 1 ? "last" : "middle";
          const range = getRange(CARDS_ARRAY.length, i, label);
          const translateY = animationValue.interpolate({
            ...range,
            extrapolate: "clamp"
          });
          return (
            <Animated.View
              key={i}
              style={[{ transform: [{ translateY }] }, StyleSheet.absoluteFill]}
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
