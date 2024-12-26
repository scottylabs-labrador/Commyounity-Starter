import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert,
} from 'react-native';
import { useAuth } from './AuthContext';
import { useRouter, useNavigation } from 'expo-router';
import SmileyFace from '@/components/SmileyFace';

const LoginView: React.FC = () => {
  
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const { account, setAccount } = useAuth();
  const router = useRouter();
  
  const showAlert = (viewId: string) => Alert.alert('Alert', 'Button pressed ' + viewId);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/check-account?email=${email}&password=${password}`);
    
      if (response.status === 200) {
        Alert.alert('Login Successful', 'Welcome back!');
        const data = await response.json();
        setAccount(data.username)
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
      <SmileyFace/>

      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="email"
          underlineColorAndroid="transparent"
          onChangeText={text => setEmail(text)}
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
        onPress={handleSignup}>
        <Text style={styles.linktext}>Sign up</Text>
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
    color: '#4E4AFD',
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
    marginBottom: 20
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
    backgroundColor: '#C5B9FF',
    borderRadius: 8,
    width: '30%',
    alignItems: 'center',
    paddingVertical: 10
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    color: '#C1A6F1',
    fontSize: 14,
    marginTop: 10,
  },
  linktext: {
    color: '#C5B9FF',
    textDecorationLine: "underline"
  }
});

export default LoginView;

