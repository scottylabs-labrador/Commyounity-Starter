import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Alert} from 'react-native';
import { useAuth } from './AuthContext';
import { useRouter } from 'expo-router';

export default function SignUpScreen() {
    const [username, setUsername] = useState<string | undefined>(undefined);
    const [email, setEmail] = useState<string | undefined>(undefined);
    const [email2, setEmail2] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);
    const [password2, setPassword2] = useState<string | undefined>(undefined);
    const { account, setAccount } = useAuth();
    const router = useRouter();

    const handleSignup = async () => {
        if (!username) {
            Alert.alert('Error', 'Please enter name');
            return;
        } else if (!email || !email2) {
            Alert.alert('Error', 'Please enter email');
            return;
        } else if (!(email === email2)) {
            Alert.alert('Error', 'Email does not match');
            return;
        } else if (!password || !password2) {
            Alert.alert('Error', 'Please enter password');
            return;
        } else if (!(password === password2)) {
            Alert.alert('Error', 'Password does not match');
            return;
        } 
    
        const url = 'http://127.0.0.1:8000/api/create-account/';
        const payload = {
            username,
            password,
        };
        try {
            console.log(JSON.stringify(payload));
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
              });
        
            if (response.status === 201) {
                Alert.alert('Sign up Successful', 'Welcome!');
                setAccount(username);
                router.push('events');
            } else if (response.status === 400) {
                console.log("Username already exists");
                Alert.alert('Sign up Failed', 'Username already exists');
            } else {
                console.log(response.status);
                console.log("Signing up Failed");
                Alert.alert('Signing up Failed', 'Cannot sign up.');
            }
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Error', 'Could not connect to the server.');
        }
      };

    return (
    <View style={styles.container}>
      {/* Header Section */}
      <Text style={styles.title}>
        Comm-<Text style={styles.highlight}>YOU</Text>-nity
      </Text>

      {/* Form Section */}
      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput 
            style={styles.input} 
            placeholder="name" 
            placeholderTextColor="#aaa" 
            onChangeText={text => setUsername(text)}
            />

        <Text style={styles.label}>Email</Text>
        <TextInput 
            style={styles.input} 
            placeholder="email" 
            placeholderTextColor="#aaa" 
            onChangeText={text => setEmail(text)}
            />

        <Text style={styles.label}>Confirm Email</Text>
        <TextInput 
            style={styles.input} 
            placeholder="email" 
            placeholderTextColor="#aaa" 
            onChangeText={text => setEmail2(text)}
            />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="password"
          secureTextEntry
          placeholderTextColor="#aaa"
          onChangeText={text => setPassword(text)}
        />

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="password"
          secureTextEntry
          placeholderTextColor="#aaa"
          onChangeText={text => setPassword2(text)}
        />
      </View>

      {/* Sign-Up Button */}
      <TouchableOpacity 
      style={styles.button}
      onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign up</Text>
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
