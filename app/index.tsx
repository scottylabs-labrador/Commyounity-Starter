import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert,
} from 'react-native';
import { useAuth } from './AuthContext';
import { useRouter } from 'expo-router';

const LoginView: React.FC = () => {
  
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const { account, setAccount } = useAuth();
  const router = useRouter();
  
  const showAlert = (viewId: string) => Alert.alert('Alert', 'Button pressed ' + viewId);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/check-account?username=${username}&password=${password}`);
    
      if (response.status === 200) {
        Alert.alert('Login Successful', 'Welcome back!');
        setAccount(username);
        router.push('events');
      } else if (response.status === 404) {
        Alert.alert('Error', 'User not found.');
      } else if (response.status === 401) {
        Alert.alert('Error', 'User not found.');
      } else {
        Alert.alert('Login Failed', 'Invalid username or password.');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Could not connect to the server.');
    }
  };

  const handleSignup = async () => {
    router.push('signup');
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Comm-<Text style={styles.highlight}>YOU</Text>-nity
      </Text>

      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="name"
          underlineColorAndroid="transparent"
          onChangeText={text => setUsername(text)}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="password"
          secureTextEntry={true}
          underlineColorAndroid="transparent"
          onChangeText={text => setPassword(text)}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.link}
        onPress={() => showAlert('forgot password')}>
        <Text>Forgot your password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.link}
        onPress={handleSignup}>
        <Text>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  highlight: {
    color: '#7D4DFF',
  },
  emojiContainer: {
    backgroundColor: '#FFFFCC',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  emoji: {
    fontSize: 40,
  },
  form: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    color: '#000',
  },
  input: {
    backgroundColor: '#F9F9F9',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    marginBottom: 15,
    color: '#000',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#E0D8F9',
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 10,
  },
  buttonText: {
    color: '#7D4DFF',
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    color: '#C1A6F1',
    fontSize: 14,
    marginTop: 10,
  },
});

export default LoginView;

