import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Card from "./Card";

export default function Root() {
  return (
    <SafeAreaView style={styles.container}>
      {Array.from({ length: 15 }).map((_, i) => (
        <Card key={i} />
      ))}
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
