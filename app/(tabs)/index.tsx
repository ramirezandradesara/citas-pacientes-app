import { useState, useRef, useEffect } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView as RNScrollView,
  Animated,
} from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { Formulario } from "../../components/Formulario";
import PacienteCard from "@/components/PacienteCard";
import { specialties } from "@/data/specialties";
import { products } from "@/data/products";
import { initialPacientes } from "@/data/initialPatients";
import { Paciente } from "@/model/Patient";

export default function HomeScreen() {
  const [pacientes, setPacientes] = useState<Paciente[]>(initialPacientes);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(-20)).current;
  const subtitleAnim = useRef(new Animated.Value(0)).current;
  const animatedValues = products.map(() => ({
    opacity: new Animated.Value(0),
    scale: new Animated.Value(0.8),
  }));

  // sequence
  const handlePressNuevaCita = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 20,
      bounciness: 12,
      // friction: 10,
      // tension: 10,
    }).start(() => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 20,
        bounciness: 10,
      }).start(() => {
        setModalVisible(true);
      });
    });
  };

  // interpolate
  const interpolatedOpacity = subtitleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const interpolatedTranslateY = subtitleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });

  useEffect(() => {
    // parallel
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.timing(subtitleAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    // sequence (for each item)
    const animations = animatedValues.map(({ opacity, scale }, index) =>
      Animated.sequence([
        Animated.delay(index * 100), // once the previous animation is done
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
            speed: 20,
            bounciness: 10,
          }),
        ]),
      ])
    );

    Animated.stagger(80, animations).start();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RNScrollView contentContainerStyle={styles.scrollContainer}>
        <Animated.Text
          style={[
            styles.titulo,
            {
              opacity: opacityAnim,
              transform: [{ translateY: translateYAnim }],
            },
          ]}
        >
          Administrador de citas
        </Animated.Text>

        <Animated.Text
          style={[
            styles.subtitulo,
            {
              opacity: interpolatedOpacity,
              transform: [{ translateY: interpolatedTranslateY }],
            },
          ]}
        >
          Nuestras especialidades
        </Animated.Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scroll}
          contentContainerStyle={{ paddingVertical: 16, marginHorizontal: 5 }}
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
          {products.map((product, index) => {
            const animStyle = {
              opacity: animatedValues[index].opacity,
              transform: [{ scale: animatedValues[index].scale }],
            };

            return (
              <Animated.View
                key={product.id}
                style={[styles.productoItem, animStyle]}
              >
                <Animated.Image
                  source={{ uri: product.imgUrl }}
                  style={styles.imagenCard}
                  resizeMode="cover"
                />
              </Animated.View>
            );
          })}
        </View>

        <Text style={styles.subtitulo}>Veterinaria</Text>
        <Pressable onPress={handlePressNuevaCita}>
          <Animated.View
            style={[styles.btnNuevaCita, { transform: [{ scale: scaleAnim }] }]}
          >
            <Text style={styles.btnTextoNuevaCita}>Nueva cita</Text>
          </Animated.View>
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
    marginBottom: 10,
  },
});
