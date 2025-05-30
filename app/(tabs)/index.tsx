import { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Formulario } from "../../components/Formulario";
import PacienteCard from "@/components/PacienteCard";

export type Paciente = {
  id: string;
  paciente: string;
  propietario: string;
  email: string;
  telefono: string;
  sintomas: string;
  fecha: Date;
};

const initialPacientes: Paciente[] = [
  {
    id: "1",
    paciente: "Luna",
    propietario: "Juan Perez",
    email: "",
    telefono: "123456789",
    sintomas: "Tos y fiebre",
    fecha: new Date("2023-10-01T10:00:00"),
  },
];

export default function HomeScreen() {
  const [pacientes, setPacientes] = useState<Paciente[]>(initialPacientes);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.contenedor}>
        <Text style={styles.titulo}>Administrador de citas</Text>
        <Text style={styles.tituloBold}>Veterinaria</Text>
        <Pressable
          onPress={() => setModalVisible(true)}
          style={styles.btnNuevaCita}
        >
          <Text style={styles.btnTextoNuevaCita}>Nueva cita</Text>
        </Pressable>

        {pacientes.length == 0 ? (
          <Text style={styles.emptyState}>No hay pacientes</Text>
        ) : (
          <FlatList
            data={pacientes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PacienteCard item={item} />}
          />
        )}

        <Formulario
          modalVisible={modalVisible}
          handleCloseModal={handleCloseModal}
          setPacientes={setPacientes}
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
    color: "#026B75",
  },
  btnNuevaCita: {
    backgroundColor: "#026B75",
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
  emptyState: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
});
