import {
  Modal,
  Button,
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function Formulario({ modalVisible, nuevaCitaHandler }) {
  return (
    <Modal animationType="slide" visible={modalVisible}>
      <SafeAreaView style={styles.contenido}>
        <ScrollView>
          <Text style={styles.titulo}>
            Nueva <Text style={styles.tituloBold}>cita</Text>
          </Text>

          <View style={styles.campo}>
            <Text style={styles.label}>Nombre paciente</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre paciente"
              placeholderTextColor={"#666"}
            />
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Nombre propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre propietario"
              placeholderTextColor={"#666"}
            />
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre paciente"
              placeholderTextColor={"#666"}
              keyboardType="email-address"
            />
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Teléfono propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Teléfono propietario"
              placeholderTextColor={"#666"}
              keyboardType="number-pad"
            />
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Síntomas</Text>
            <TextInput
              style={styles.input}
              placeholder="Síntomas"
              placeholderTextColor={"#666"}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  contenido: {
    backgroundColor: "#6d28d9",
    flex: 1,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 30,
    color: "#fff",
  },
  tituloBold: {
    fontWeight: 800,
  },
  campo: {
    marginTop: 10,
    marginHorizontal: 30,
    marginBottom: 10,
  },
  label: {
    color: "#FFF",
    marginBottom: 18,
    marginTop: 15,
    fontSize: 20,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderColor: "red",
  },
});
