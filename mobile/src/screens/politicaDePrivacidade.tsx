import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { PropsScreensApp } from "../routes/interfaces";

export const PoliticaPrivacidade = ({ navigation }: PropsScreensApp) => {
  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Feather
          name="arrow-left-circle"
          size={40}
          color="black"
          onPress={() => navigation.goBack()}
          accessible={true}
          accessibilityLabel="Voltar para a página anterior"
        />
        <Text style={styles.title}>Política de Privacidade</Text>
      </View>

      {/* Conteúdo */}
      <Text style={styles.paragraph}>
        Respeitamos sua privacidade e estamos comprometidos em proteger as
        informações pessoais que você compartilha conosco. No Job App, os dados
        coletados são utilizados exclusivamente para melhorar sua experiência na
        busca e no gerenciamento de vagas de emprego.
      </Text>
      <Text style={styles.paragraph}>
        Garantimos que nenhuma informação pessoal será compartilhada com
        terceiros sem o seu consentimento explícito. Além disso, todas as suas
        informações são tratadas com segurança e de acordo com as melhores
        práticas de proteção de dados.
      </Text>
      <Text style={styles.paragraph}>
        Dúvidas ou sugestões? Entre em contato com nossa equipe de suporte.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
    paddingTop: 40,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    width: "100%",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#333",
  },
  paragraph: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    lineHeight: 24,
  },
});

export default PoliticaPrivacidade;
