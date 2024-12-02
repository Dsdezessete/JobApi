import { Text, StyleSheet, Image, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { PropsScreensApp } from "../routes/interfaces";

export const Sobre = ({ navigation }: PropsScreensApp) => {
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
      </View>

      {/* Conteúdo */}
      <Text style={styles.title}>Sobre o Job App!</Text>
      <Text style={styles.paragraph}>
        Nosso objetivo é conectar você às melhores oportunidades de emprego,
        simplificando sua jornada profissional.
      </Text>
      <Text style={styles.paragraph}>Com o Job App, você pode:</Text>
      <Text style={styles.paragraph}>
        - Encontrar oportunidades de emprego de acordo com suas habilidades.
      </Text>
      <Text style={styles.paragraph}>
        - Entrar em contato diretamente com recrutadores.
      </Text>
      <Text style={styles.paragraph}>
        - Gerenciar seu perfil de forma fácil e rápida.
      </Text>
      <Text style={styles.paragraph}>
        Este aplicativo foi desenvolvido com foco na praticidade e na
        acessibilidade, utilizando tecnologias modernas e seguras.
      </Text>
      <Text style={styles.paragraph}>
        Agradecemos por fazer parte dessa experiência. Boa sorte em sua
        jornada profissional! 🚀
      </Text>
      <Text style={styles.paragraph}>Equipe Job App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  paragraph: {
    textAlign: "left",
    marginBottom: 15,
    fontSize: 16,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
});

export default Sobre;
