import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { useThemeStyles, Theme } from "../../hooks/useThemeStyles";

export default function TabOneScreen() {
  const [count, setCount] = useState<number>(0);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const increment = () => {
    if (count >= 10) {
      Alert.alert("Aviso", "El contador no puede ser mayor a 10");
      return;
    }
    setCount(count + 1);
  };

  const reset = () => setCount(0);
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const styles = useThemeStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.counter}>{count}</Text>

        <Pressable 
          style={({ pressed}) => [
            styles.button,
            pressed && { opacity: 0.7},
            count >= 10 && { backgroundColor: "gray"},
          ]} 
          onPress={increment}
          disabled={count >= 10}
        >
          <Text style={styles.buttonText}>+1</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.button, pressed && { opacity: 0.7}]}
          onPress={reset}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </Pressable>

        <Pressable
          style={({ pressed}) => [styles.button, pressed && { opacity: 0.7}]}
          onPress={toggleTheme}
        >
          <Text style={styles.buttonText}>Toggle</Text>
        </Pressable>
      </View>
    </View>
  );
}
