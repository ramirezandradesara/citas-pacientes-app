import { Paciente } from "@/model/Patient";

export const initialPacientes: Paciente[] = [
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
    paciente: "Milo",
    propietario: "Sara Ramírez",
    email: "",
    telefono: "123456789",
    sintomas: "Tos y fiebre",
    fecha: new Date("2023-10-01T10:00:00"),
  },
];
