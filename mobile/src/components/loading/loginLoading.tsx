import React from "react";
import { 
  ActivityIndicator, 
  StyleSheet, 
  SafeAreaView, 
  Text, 
  View, 
  ViewStyle,
  TextStyle
} from "react-native";
import { Button } from "../Button"; // Assuming you've renamed Buttom to Button

export type LoadingScreenProps = {
  message?: string;
  backgroundColor?: string;
  indicatorColor?: string;
  onCancel?: () => void;
  cancelButtonText?: string;
};

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = "Carregando...",
  backgroundColor = "#8fe1d745",
  indicatorColor = "#0000ff",
  onCancel,
  cancelButtonText = "Cancelar"
}) => {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        <Text 
          style={styles.loadingText}
          accessibilityRole="status"
          accessibilityLabel={message}
        >
          {message}
        </Text>
        
        <View style={styles.inputContainer}>
          <ActivityIndicator 
            size="large" 
            color={indicatorColor} 
            accessibilityLabel="Carregando"
          />
        </View>

        {onCancel && (
          <Button 
            size="xlarge" 
            color="white"
            onPress={onCancel}
          >
            {cancelButtonText}
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
};

type Styles = {
  container: ViewStyle;
  content: ViewStyle;
  loadingText: TextStyle;
  inputContainer: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  loadingText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 50,
    textAlign: "center",
  },
  inputContainer: {
    width: "90%",
    alignItems: "center",
    marginVertical: 100,
  },
});

export default LoadingScreen;
