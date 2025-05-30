import React from "react";
import { Paciente } from "@/app/(tabs)";
import { Text } from "react-native";

type PacienteCardProps = {
  item: Paciente;
};

export default function PacienteCard({ item }: PacienteCardProps) {
  const { paciente, propietario, email, telefono, sintomas, fecha } = item;

  return <Text>{paciente}</Text>;
}
