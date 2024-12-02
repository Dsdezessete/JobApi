import React, { useState } from "react";
import { PropsScreensApp } from "../routes/interfaces";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import InputField from "../components/InputField";
import Button from "../components/Button";
import LoadingScreen from "../components/loading/LoginLoading";

function RecuperarSenha({ navigation }: PropsScreensApp) {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrorMessage("");

    // Alerta para indicar contato necessário com os desenvolvedores.
    Alert.alert("Recuperar Senha", "Entre em contato com os desenvolvedores.");
    setIsLoading(false);
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(senha);
    Alert.alert(
      "Senha copiada!",
      "A senha foi copiada para sua área de transferência."
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Image
            source={require("@/assets/images/job.png")}
            style={styles.image}
          />
          <View style={styles.content}>
            <Text style={styles.title}>Recuperar Senha</Text>

            {senha ? (
              <View style={styles.senhaContainer}>
                <Text style={styles.senhaTexto}>Sua nova senha é:</Text>
                <Text style={styles.senha}>{senha}</Text>

                <TouchableOpacity
                  style={styles.copyButton}
                  onPress={copyToClipboard}
                >
                  <Text style={styles.copyButtonText}>Copiar Senha</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.inputContainer}>
                <InputField
                  value={email}
                  onChangeText={setEmail}
                  titulo="E-mail"
                  placeholder="Digite seu e-mail"
                  types="text"
                />
                <InputField
                  value={nome}
                  onChangeText={setNome}
                  titulo="Nome"
                  placeholder="Digite seu nome"
                  types="text"
                />
                {errorMessage ? (
                  <Text style={styles.errorMessage}>{errorMessage}</Text>
                ) : null}
                <Button size="xlarge" onPress={handleSubmit}>
                  Enviar
                </Button>
              </View>
            )}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  content: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
  },
  image: {
    width: "100%",
    height: "40%",
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    gap: 20,
  },
  senhaContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  senhaTexto: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  senha: {
    fontSize: 24,
    color: "#f00",
    fontWeight: "bold",
  },
  copyButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
  },
  copyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorMessage: {
    color: "red",
    marginTop: 10,
  },
});

export default RecuperarSenha;
