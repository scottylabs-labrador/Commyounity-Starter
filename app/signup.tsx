import React, { useState , useEffect} from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Alert} from 'react-native';
import { useAuth } from './AuthContext';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { send, EmailJSResponseStatus } from '@emailjs/react-native';
import SmileyFaceMedium from '@/components/SmileyFaceMedium';
import { useFonts } from 'expo-font';

export default function SignUpScreen() {

    const [fontsLoaded] = useFonts({
      'PixelifySans': require('@/assets/fonts/PixelifySans.ttf'), 
      'Inter': require('@/assets/fonts/Inter.ttf'), 
    });
    const [nickname, setName] = useState<string | undefined>(undefined);
    const [email, setEmail] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);
    const [password2, setPassword2] = useState<string | undefined>(undefined);
    const [account, setAccount] = useState<string | undefined>(undefined);
    const navigation = useNavigation();
    const router = useRouter();

    const handleSignup = async () => {
        if (!nickname) {
            window.alert('Please enter your name');
            return;
        } else if (!email) {
            window.alert('Please enter your email');
            return;
        } else if (!password || !password2) {
            window.alert('Please enter password');
            return;
        } else if (!(password === password2)) {
            window.alert('Password does not match');
            return;
        } 
    
        const url = 'http://127.0.0.1:8000/api/create-account/';
        const payload = {
            nickname, 
            password,
            email
        };
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
              });
            
            const data = await response.json();
            if (response.status === 201) {
              try {
                await send(
                  'service_7jcyohr',
                  'template_xbothcd',
                  {
                    account: data.username,
                  },
                  {
                    publicKey: 'Md2K_RS0-RqCWFvBu',
                  },
                );
                window.alert('Verification code sent to email, please check it out');
              } catch (err) {
                if (err instanceof EmailJSResponseStatus) {
                  window.alert('Failed to send verification email');
                } else {
                  window.alert(err);
                }
              }
            } else if (response.status === 400) {
                window.alert('User already exists');
            } else {
                window.alert('Cannot sign up.');
            }
        } catch (error) {
            console.error('Login error:', error);
            window.alert('Could not connect to the server.');
        }
      };

    const handleLogin = async () => {
      navigation.navigate("index");
    };

    return (
    <View style={styles.container}>
      {/* Header Section */}
      <Text style={styles.title}>
        Comm<Text style={styles.highlight}>(you)</Text>nity
      </Text>
      {/* <SmileyFaceMedium/> */}

      {/* Form Section */}
      <View style={styles.form}>

        <TextInput 
            style={styles.input} 
            placeholder="Nickname" 
            placeholderTextColor="#aaa" 
            onChangeText={text => setName(text)}
          />
        <TextInput 
            style={styles.input} 
            placeholder="Email" 
            placeholderTextColor="#aaa" 
            onChangeText={text => setEmail(text)}
            />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="#aaa"
          onChangeText={text => setPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="#aaa"
          onChangeText={text => setPassword2(text)}
        />
      </View>

      {/* Sign-Up Button */}
      <TouchableOpacity 
      style={styles.button}
      onPress={handleSignup}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>

      <View style={styles.loginRow}>
        <Text style={styles.hintSignUp}>Already have an account? </Text>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.linktext}>Log in</Text>
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
    fontSize: 32,
    color: '#000',
    marginBottom: 10,
    fontFamily: "Inter",
    fontWeight: '800',
  },
  highlight: {
    color: '#4E4AFD',
    fontFamily: "Inter",
    fontWeight: '800',
  },
  emojiContainer: {
    backgroundColor: '#FFFFCC',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emoji: {
    fontSize: 40,
  },
  form: {
    width: '100%',
    marginBottom: 10,
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
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  
});
