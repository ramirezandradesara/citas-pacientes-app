import React from "react";
import { Paciente } from "@/app/(tabs)";
import { Text, View, StyleSheet, Pressable } from "react-native";

type PacienteCardProps = {
  item: Paciente;
};
// editar o crear paciente
export default function PacienteCard({ item }: PacienteCardProps) {
  const { paciente, fecha } = item;

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(date).toLocaleDateString("es-ES", options);
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>Paciente:</Text>
      <Text style={styles.patientText}>{paciente}</Text>
      <Text>{formatDate(fecha)}</Text>

      <View style={styles.btnsContainer}>
        <Pressable style={[styles.btn, styles.btnEdit]}>
          <Text style={styles.btnText}>Editar</Text>
        </Pressable>
        <Pressable style={[styles.btn, styles.btnDelete]}>
          <Text style={styles.btnText}>Eliminar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  patientText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#026B75",
    marginBottom: 5,
  },
  btnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  btnEdit: {
    backgroundColor: "#F3F4F6",
  },
  btnDelete: {
    backgroundColor: "#F87171",
  },
  btnText: {
    transform: [{translateX: -2}]
  },
});
