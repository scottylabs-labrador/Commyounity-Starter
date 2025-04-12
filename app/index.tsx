import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert,
} from 'react-native';
import { useAuth } from './AuthContext';
import { useRouter, useNavigation } from 'expo-router';
import SmileyFace from '@/components/SmileyFace';
import { useFonts } from 'expo-font';


const LoginView: React.FC = () => {

  const [fontsLoaded] = useFonts({
    'PixelifySans': require('@/assets/fonts/PixelifySans.ttf'), 
    'Inter': require('@/assets/fonts/Inter.ttf'), 
  });

  
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
        router.push('/yourein');
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
    router.push('/signup');
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Comm<Text style={styles.highlight}>(you)</Text>nity
      </Text>
      {/* <SmileyFace/> */}

      <View style={styles.form}>
       
        <TextInput
          style={styles.input}
          placeholder="Email"
          underlineColorAndroid="transparent"
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          underlineColorAndroid="transparent"
          onChangeText={text => setPassword(text)}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}>
        <Text style={styles.buttonText}>LOG IN</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
          <Text style={styles.hintSignUp}>Don’t have an account yet? </Text>
        <TouchableOpacity onPress={handleSignup}>
          <Text style={styles.linktext}>Sign up</Text>
        </TouchableOpacity>
      </View>

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
    fontSize: 36,
    fontWeight: '800',
    color: '#000',
    marginBottom: 20,
    fontFamily: "Inter",
  },
  highlight: {
    color: '#4E4AFD',
    fontFamily: "Inter",
    fontWeight: '800'
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
    marginBottom: 15
  },
  label: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 5,
    color: '#000',
    marginLeft: 10,
  },
  input: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,  
    borderWidth: 0,
    borderColor: '#DDD',
    marginBottom: 15,
    color: '#868686',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#4D4AF4',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,  
    borderWidth: 0,
    alignItems: 'center',
    width: '100%',  
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    fontFamily: "Inter",
  },
  link: {
    color: '#C1A6F1',
    fontSize: 14,
    marginTop: 10,
  },
  linktext: {
    color: '#C5B9FF',
    textDecorationLine: "underline",
    marginTop: 10,
  },
  hintSignUp: {
    color: '#868686',
    fontSize: 14,
    marginTop: 10,
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  
});

export default LoginView;

