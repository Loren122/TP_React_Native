import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

type Filter = "all" | "active" | "completed";

export default function ToDoScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const saved = await AsyncStorage.getItem("tasks");
        if (saved) setTasks(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading tasks", e);
      }
    };
    loadTasks();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!text.trim()) return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now().toString(), text: text.trim(), completed: false },
    ]);
    setText("");
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    Alert.alert("Eliminar tarea", "¿Seguro que deseas eliminarla?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => {
          setTasks((prev) => prev.filter((task) => task.id !== id));
        },
      },
    ]);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const renderItem = ({ item }: { item: Task }) => (
    <Pressable
      onLongPress={() => deleteTask(item.id)}
      delayLongPress={400}
      style={styles.taskRow}
    >

      <Pressable
        style={[
          styles.checkbox,
          item.completed && styles.checkboxCompleted,
        ]}
        onPress={() => toggleTask(item.id)}
      >
        {item.completed && <Text style={styles.checkmark}>✓</Text>}
      </Pressable>

      {/* Texto */}
      <Text
        style={[
          styles.taskText,
          item.completed && styles.taskTextCompleted,
        ]}
      >
        {item.text}
      </Text>
    </Pressable>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.title}>Mis Tareas</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Agregar tarea..."
          value={text}
          onChangeText={setText}
          onSubmitEditing={addTask}
        />
        <Pressable style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      </View>

      <View style={styles.filterRow}>
        <Pressable onPress={() => setFilter("all")}>
          <Text
            style={[styles.filter, filter === "all" && styles.filterActive]}
          >
            Todas
          </Text>
        </Pressable>
        <Pressable onPress={() => setFilter("active")}>
          <Text
            style={[styles.filter, filter === "active" && styles.filterActive]}
          >
            Activas
          </Text>
        </Pressable>
        <Pressable onPress={() => setFilter("completed")}>
          <Text
            style={[
              styles.filter,
              filter === "completed" && styles.filterActive,
            ]}
          >
            Completadas
          </Text>
        </Pressable>
      </View>

      <Text style={styles.counter}>
        Total: {tasks.length} | Completadas:{" "}
        {tasks.filter((t) => t.completed).length}
      </Text>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 12, textAlign: "center" },

  inputRow: { flexDirection: "row", marginBottom: 12 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#fff",
  },
  addButton: {
    marginLeft: 8,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  addButtonText: { color: "#fff", fontSize: 20, fontWeight: "bold" },

  filterRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  filter: { fontSize: 16, color: "#555" },
  filterActive: { fontWeight: "bold", color: "#007AFF" },

  counter: { textAlign: "center", marginBottom: 8, color: "#333" },

  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#555",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  checkboxCompleted: { backgroundColor: "#4CAF50", borderColor: "#4CAF50" },
  checkmark: { color: "white", fontWeight: "bold" },

  taskText: { fontSize: 16, flex: 1 },
  taskTextCompleted: { textDecorationLine: "line-through", color: "#999" },
});
