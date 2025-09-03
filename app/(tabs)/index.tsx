import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";

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

  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.counter}>{count}</Text>

        <Pressable style={styles.button} onPress={increment}>
          <Text style={styles.buttonText}>+1</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={reset}>
          <Text style={styles.buttonText}>Reset</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={toggleTheme}>
          <Text style={styles.buttonText}>Toggle</Text>
        </Pressable>
      </View>
    </View>
  );
}

const getStyles = (theme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme === "light" ? "#f5f5f5" : "#121212",
      padding: 20,
    },
    card: {
      width: "100%",
      maxWidth: 300,
      padding: 20,
      borderRadius: 10,
      backgroundColor: theme === "light" ? "#ffffff" : "#1e1e1e",
      alignItems: "center",
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 5,
    },
    counter: {
      fontSize: 60,
      fontWeight: "bold",
      color: theme === "light" ? "#000" : "#fff",
      marginBottom: 20,
    },
    button: {
      backgroundColor: theme === "light" ? "#007AFF" : "#00499a",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      marginVertical: 5,
      width: "100%",
      alignItems: "center",
    },
    buttonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    },
  });
