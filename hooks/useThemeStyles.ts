import { StyleSheet } from "react-native";

export type Theme = "light" | "dark";

export const useThemeStyles = (theme: Theme) => {
  return StyleSheet.create({
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
};
