import { Feather } from "@expo/vector-icons";
import React, { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { PropsScreensApp } from "../routes/interfaces";
import { Buttom } from "../components/Buttom";
import { AuthContext } from "../contexts/AuthContext";
import { useFocusEffect } from "expo-router";
import { removeUserCredentials } from "../services/auth";

function Settings({ navigation }: PropsScreensApp) {
  const { signOut } = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  useFocusEffect(React.useCallback(() => {}, []));

  function handleLogout() {
    try {
      signOut();
      removeUserCredentials();
      console.log("usuario deslogado");
    } catch (error) {
      console.log("erro:", error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Feather
          name="arrow-left-circle"
          size={40}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.welcome}>Olá, {user?.name}</Text>
      </View>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 50 }}>
        Configurações
      </Text>

      <Buttom
        size="xlarge"
        onPress={() => navigation.navigate("AtualizarDados")}
      >
        Editar dados
      </Buttom>
      <Buttom size="xlarge" onPress={() => navigation.navigate("Sobre")}>
        Sobre
      </Buttom>
      <Buttom
        size="xlarge"
        onPress={() => navigation.navigate("PoliticaDePrivacidade")}
      >
        Política de privacidade
      </Buttom>
      <Buttom onPress={handleLogout} style={styles.logout} size="medium">
        Logout
      </Buttom>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    alignItems: "center",
    gap: 40,
  },
  welcome: {
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logout: {
    position: "absolute",
    bottom: 50,
    right: 50,
  },
});
export default Settings;
