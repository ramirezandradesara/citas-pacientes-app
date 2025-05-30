import { useState } from "react";
import {
  Modal,
  Button,
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  Platform,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker"; // react-native-datetimepicker
import { Paciente } from "@/app/(tabs)";

type FormularioProps = {
  modalVisible: boolean;
  handleCloseModal: VoidFunction;
  setPacientes: React.Dispatch<React.SetStateAction<Paciente[]>>;
};

export function Formulario({
  modalVisible,
  handleCloseModal,
  setPacientes,
}: FormularioProps) {
  const [paciente, setPaciente] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [fecha, setFecha] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState<"date" | "time">("date");

  const onChange = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === "ios"); // en Android cierra al seleccionar
    if (selectedDate) {
      setFecha(selectedDate);
    }
  };

  const showMode = (currentMode: "date" | "time") => {
    setMode(currentMode);
    setShowPicker(true);
  };

  const resetForm = () => {
    setPaciente("");
    setPropietario("");
    setEmail("");
    setTelefono("");
    setSintomas("");
    setFecha(new Date());
  };

  const handleCita = () => {
    if ([paciente, propietario, email, fecha, sintomas].includes("")) {
      Alert.alert("Error", "Todos los campos son obligatorios", [
        { text: "Aceptar" },
        // { text: "Ok" },
      ]);
      return;
    }

    const nuevoPaciente = {
      paciente,
      propietario,
      email,
      telefono,
      sintomas,
      fecha,
    };

    setPacientes((prevPacientes) => [...prevPacientes, nuevoPaciente]);
    handleCloseModal();
    resetForm();
  };

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <SafeAreaView style={styles.contenido}>
        <ScrollView>
          <Text style={styles.titulo}>
            Nueva <Text style={styles.tituloBold}>cita</Text>
          </Text>
          <Pressable>
            <Text style={styles.closeBtn} onLongPress={handleCloseModal}>
              Cerrar
            </Text>
          </Pressable>

          <View style={styles.campo}>
            <Text style={styles.label}>Nombre paciente</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre paciente"
              placeholderTextColor={"#666"}
              value={paciente}
              onChangeText={(text) => setPaciente(text)}
            />
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Nombre propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre propietario"
              placeholderTextColor={"#666"}
              value={propietario}
              onChangeText={(text) => setPropietario(text)}
            />
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={"#666"}
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Teléfono propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Teléfono propietario"
              placeholderTextColor={"#666"}
              keyboardType="number-pad"
              value={telefono}
              onChangeText={(text) => setTelefono(text)}
              maxLength={10}
            />
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Síntomas</Text>
            <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder="Síntomas"
              placeholderTextColor={"#666"}
              multiline
              numberOfLines={4}
              value={sintomas}
              onChangeText={(text) => setSintomas(text)}
            />
          </View>

          {/* Campo Fecha de cita */}
          <View style={styles.campo}>
            <Text style={styles.label}>Fecha de la cita</Text>
            <Button
              title={fecha.toLocaleDateString()}
              onPress={() => showMode("date")}
              color="#006C74"
            />
          </View>

          {/* Campo Hora de cita */}
          <View style={styles.campo}>
            <Text style={styles.label}>Hora de la cita</Text>
            <Button
              title={fecha.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              onPress={() => showMode("time")}
              color="#006C74"
            />
          </View>

          {showPicker && (
            <DateTimePicker
              value={fecha}
              mode={mode}
              display="default"
              onChange={onChange}
            />
          )}

          <Pressable style={styles.btnNuevaCita} onPress={handleCita}>
            <Text style={styles.btnNuevaCitaText}>Agregar paciente</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  contenido: {
    backgroundColor: "#EAEFEE",
    flex: 1,
    padding: 20,
  },
  closeBtn: {
    textAlign: "center",
    color: "#026B75",
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 20,
    borderColor: "#026B75",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 5,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 30,
    color: "#026B75",
  },
  tituloBold: {
    fontWeight: 800,
  },
  campo: {
    marginTop: 10,
    marginBottom: 10,
  },
  label: {
    color: "#026B75",
    marginBottom: 10,
    marginTop: 5,
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 5,
    borderColor: "red",
    color: "#EAEFEE",
  },
  dateBtn: {
    backgroundColor: "#006C74",
  },
  btnNuevaCita: {
    marginVertical: 50,
    backgroundColor: "#006C74",
    borderRadius: 10,
  },
  btnNuevaCitaText: {
    textAlign: "center",
    color: "#fff",
    padding: 10,
  },
});
