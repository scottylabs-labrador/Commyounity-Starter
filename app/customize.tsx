import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const CustomizePage = () => {

  return (
    <View style={styles.container}>
      <View style={styles.headline}>
        <Text style={styles.title}> Tell us about </Text>
        <Text style={styles.title}>
            <Text style={styles.highlight}>YOU</Text>
            !
        </Text>
      </View>
    </View>
  );
};

export default CustomizePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#FFFFFF',
  },
  headline:{
    alignItems: "center",
    padding: 15
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },
  highlight: {
    color: '#4E4AFD',
  }
});
