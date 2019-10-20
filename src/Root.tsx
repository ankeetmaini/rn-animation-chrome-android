import React, { useRef } from "react";
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
const CARDS_ARRAY = Array.from({ length: TOTAL_CARDS });

export default function Root() {
  const animationValue = useRef(new Animated.Value(0)).current;
  let startPanY = useRef(0).current;
  let totalPanY = useRef(0).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (_, { y0 }) => {
        startPanY = y0;
      },
      onPanResponderMove: (_, { moveY }) => {
        totalPanY += moveY - startPanY;
        startPanY = moveY;
        animationValue.setValue(totalPanY);
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
        {CARDS_ARRAY.map((_, i) => {
          const variableAmount = TOTAL_CARDS - i - 1 || TOTAL_CARDS - 1;
          console.log({ variableAmount, i });
          const inputRange = [
            0,
            variableAmount * DRAG_AMOUNT,
            variableAmount * DRAG_AMOUNT + DRAG_AMOUNT
          ];
          const outputRange = [
            0,
            0,
            variableAmount * DRAG_AMOUNT + DRAG_AMOUNT
          ];

          const translateY = animationValue.interpolate({
            inputRange,
            outputRange,
            extrapolate: "clamp"
          });
          // console.log(values, animationValue);
          return (
            <Animated.View
              key={i}
              style={[
                { transform: [{ translateY }] },
                StyleSheet.absoluteFill,
                {}
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
