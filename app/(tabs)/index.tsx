import { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Formulario from "../../components/Formulario";

export default function HomeScreen() {
  const [clientes, setClientes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const nuevaCitaHandler = () => {
    console.log("nuevaCitaHandler clicked");
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.contenedor}>
        <Text style={styles.titulo}>Hola Mundo!</Text>
        <Text style={styles.tituloBold}>Soy Sari</Text>
        {/* <Button onPress={() => console.log("Press")} title="Nueva cita" /> */}
        <Pressable
          onPress={() => setModalVisible(true)}
          style={styles.btnNuevaCita}
        >
          <Text style={styles.btnTextoNuevaCita}>Nueva cita</Text>
        </Pressable>
        <Formulario
          modalVisible={modalVisible}
          nuevaCitaHandler={nuevaCitaHandler}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
    flex: 1,
  },
  titulo: {
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "white",
  },
  tituloBold: {
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "purple",
  },
  btnNuevaCita: {
    backgroundColor: "#6D28D9",
    marginRight: 5,
    marginHorizontal: 5,
    borderRadius: 10,
    padding: 15,
  },
  btnTextoNuevaCita: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: 900,
    textTransform: "uppercase",
  },
});
