import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function YoureInScreen() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/interest');
    }, 5000); // 3 seconds

    return () => clearTimeout(timeout); // cleanup
  }, []);

  return (
    <View style={styles.container}>
      {/* Replace with your actual illustration */}
      <Image source={require('@/assets/images/youre-in.png')} style={styles.image} />

      <Text style={styles.title}>You’re in!</Text>
      <Text style={styles.subtitle}>Let’s find some events together...</Text>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    image: {
      width: 250,
      height: 250,
      marginBottom: 10,
    },
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      color: '#000',
    },
    subtitle: {
      fontSize: 18,
      color: '#A3A3A3',
      marginTop: 10,
    },
  });
  