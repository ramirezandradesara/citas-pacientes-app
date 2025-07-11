import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView as RNScrollView,
} from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { Formulario } from "../../components/Formulario";
import PacienteCard from "@/components/PacienteCard";
import { specialties } from "@/data/specialties";
import { products } from "@/data/products";

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
  {
    id: "2",
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RNScrollView contentContainerStyle={styles.scrollContainer}>
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

        <Text style={styles.subtitulo}>Nuestros productos</Text>
        <View style={styles.listaProductos}>
          {products.map((product) => (
            <View key={product.id} style={styles.productoItem}>
              <Image
                source={{ uri: product.imgUrl }}
                style={styles.imagenCard}
              />
            </View>
          ))}
        </View>

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
          <View style={styles.listaPacientes}>
            {pacientes.map((item) => (
              <PacienteCard key={item.id} item={item} />
            ))}
          </View>
        )}

        <Formulario
          modalVisible={modalVisible}
          handleCloseModal={handleCloseModal}
          setPacientes={setPacientes}
        />
      </RNScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 40,
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
    marginTop: 15,
  },
  scroll: {
    height: 170,
  },
  card: {
    marginRight: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 4,
    width: 160,
    // Sombra iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
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
  listaPacientes: {
    gap: 12,
    paddingBottom: 20,
  },
  listaProductos: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productoItem: {
    flexBasis: "49%",
    marginBottom: 10
  },
});
