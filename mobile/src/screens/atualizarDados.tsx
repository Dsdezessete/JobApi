import React, { useState } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  StyleSheet, 
  TouchableOpacity,
  Alert
} from 'react-native';
import { Button } from '../Button';
import InputField from '../InputField';
import { Feather } from '@expo/vector-icons';

type UserData = {
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: string;
};

const AtualizarDados: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    nome: '',
    email: '',
    telefone: '',
    dataNascimento: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof UserData, string>>>({});

  const validateForm = () => {
    const newErrors: Partial<Record<keyof UserData, string>> = {};

    if (!userData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!userData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = 'E-mail inválido';
    }

    if (!userData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório';
    } else if (!/^\(\d{2}\)\s?\d{4,5}-\d{4}$/.test(userData.telefone)) {
      newErrors.telefone = 'Telefone inválido. Use (xx) xxxxx-xxxx';
    }

    if (!userData.dataNascimento.trim()) {
      newErrors.dataNascimento = 'Data de nascimento é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = () => {
    if (validateForm()) {
      // Lógica de atualização de dados
      Alert.alert(
        'Sucesso', 
        'Seus dados foram atualizados com sucesso!',
        [{ text: 'OK' }]
      );
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Excluir Conta', 
      'Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: () => {
            // Lógica de exclusão de conta
            Alert.alert('Conta Excluída', 'Sua conta foi excluída com sucesso.');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Atualizar Dados</Text>
      </View>

      <View style={styles.formContainer}>
        <InputField
          titulo="Nome Completo"
          placeholder="Digite seu nome"
          types="text"
          value={userData.nome}
          onChangeText={(text) => setUserData(prev => ({ ...prev, nome: text }))}
          error={errors.nome}
          required
        />

        <InputField
          titulo="E-mail"
          placeholder="Digite seu e-mail"
          types="text"
          value={userData.email}
          onChangeText={(text) => setUserData(prev => ({ ...prev, email: text }))}
          error={errors.email}
          keyboardType="email-address"
          required
        />

        <InputField
          titulo="Telefone"
          placeholder="(xx) xxxxx-xxxx"
          types="text"
          value={userData.telefone}
          onChangeText={(text) => setUserData(prev => ({ ...prev, telefone: text }))}
          error={errors.telefone}
          keyboardType="phone-pad"
          required
        />

        <InputField
          titulo="Data de Nascimento"
          types="date"
          value={userData.dataNascimento}
          onChangeText={(text) => setUserData(prev => ({ ...prev, dataNascimento: text }))}
          error={errors.dataNascimento}
          required
        />

        <View style={styles.buttonContainer}>
          <Button 
            size="medium" 
            color="primary"
            onPress={handleUpdate}
          >
            Atualizar Dados
          </Button>

          <Button 
            size="medium" 
            color="red"
            onPress={handleDeleteAccount}
          >
            Excluir Conta
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 20,
    gap: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default AtualizarDados;
