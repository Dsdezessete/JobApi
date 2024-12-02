import React, { useState } from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  ActivityIndicator, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Button } from '../Button';
import InputField from '../InputField';

type UpdateLoadingProps = {
  isLoading?: boolean;
  onUpdate?: (data: {
    name: string;
    email: string;
    currentPassword: string;
    newPassword: string;
  }) => void;
  onDeleteAccount?: () => void;
};

const UpdateLoading: React.FC<UpdateLoadingProps> = ({
  isLoading = false,
  onUpdate,
  onDeleteAccount
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: ''
  });

  const validateForm = () => {
    const newErrors = {
      name: name.trim() ? '' : 'Nome é obrigatório',
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'E-mail inválido',
      currentPassword: currentPassword.length >= 6 ? '' : 'Senha atual inválida',
      newPassword: newPassword.length >= 6 ? '' : 'Nova senha deve ter no mínimo 6 caracteres'
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleUpdate = () => {
    if (validateForm()) {
      onUpdate?.({
        name,
        email,
        currentPassword,
        newPassword
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {isLoading && (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <Text style={styles.welcomeText}>Seja Bem-vindo</Text>
        
        <View style={styles.inputContainer}>
          <InputField
            titulo='Nome'
            placeholder='Digite seu nome'
            types='text'
            value={name}
            onChangeText={setName}
            error={errors.name}
            required
          />
          <InputField
            titulo='E-mail'
            placeholder='Digite seu e-mail'
            types='text'
            value={email}
            onChangeText={setEmail}
            error={errors.email}
            keyboardType="email-address"
            required
          />
          <InputField
            titulo='Senha Atual'
            placeholder='Digite sua senha atual'
            types='text'
            secureTextEntry
            value={currentPassword}
            onChangeText={setCurrentPassword}
            error={errors.currentPassword}
            required
          />
          <InputField
            titulo='Nova Senha'
            placeholder='Digite sua nova senha'
            types='text'
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
            error={errors.newPassword}
            required
          />
        </View>
        
        <View style={styles.buttonContainer}>
          <Button 
            size="medium" 
            color="primary"
            onPress={handleUpdate}
          >
            Atualizar
          </Button>
          <Button 
            size="medium" 
            color="red"
            onPress={onDeleteAccount}
          >
            Excluir Conta
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#8fe1d745',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },
  spinner: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#e2e2e25e',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  inputContainer: {
    width: '90%',
    alignItems: 'center',
    marginBottom: 40,
    gap: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
  },
});

export default UpdateLoading;
