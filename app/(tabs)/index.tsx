import { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  View,
  Image,
} from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { Formulario } from "../../components/Formulario";
import PacienteCard from "@/components/PacienteCard";
import { specialties } from "@/data/specialties";

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
        <Text style={styles.subtitulo}>Nuestras especialidades</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scroll}
          contentContainerStyle={{ paddingVertical: 16 }}
        >
          {specialties.map((specialty) => (
            <View key={specialty.id} style={styles.card}>
              <Image
                source={{ uri: specialty.imagen }}
                style={styles.imagenCard}
                resizeMode="cover"
              />
              <Text style={styles.nombreEspecialidad}>{specialty.nombre}</Text>
            </View>
          ))}
        </ScrollView>

        <Text style={styles.subtitulo}>Veterinaria</Text>
        <Pressable
          onPress={() => setModalVisible(true)}
          style={styles.btnNuevaCita}
        >
          <Text style={styles.btnTextoNuevaCita}>Nueva cita</Text>
        </Pressable>

        {pacientes.length === 0 ? (
          <Text style={styles.emptyState}>No hay pacientes</Text>
        ) : (
          <FlatList
            data={pacientes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PacienteCard item={item} />}
            contentContainerStyle={{ paddingBottom: 100 }}
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
    flex: 1,
    backgroundColor: "#f0f4f8",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#026B75",
    marginBottom: 10,
    marginTop: 20,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    marginTop: 20,
  },
  scroll: {
    height:200
  },
  card: {
    marginRight: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
    width: 160,
  },
  imagenCard: {
    width: "100%",
    height: 100,
  },
  nombreEspecialidad: {
    textAlign: "center",
    padding: 8,
    fontWeight: "600",
    fontSize: 14,
    color: "#026B75",
  },
  btnNuevaCita: {
    backgroundColor: "#026B75",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  btnTextoNuevaCita: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  emptyState: {
    color: "#555",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
});
