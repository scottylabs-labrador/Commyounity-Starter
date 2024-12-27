import { Link, Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import { ThemedView } from '@/components/ThemedView';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Page Not Found' }} />
      <ThemedView style={styles.container}>
        {/* Decorative Elements */}
        <View style={styles.decorativeCircle} />
        <View style={styles.decorativeCorner} />

        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <Text style={styles.illustrationText}>404</Text>
          <Text style={styles.illustrationSubtext}>Page Not Found</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>Oops! Something went wrong.</Text>

        {/* Description */}
        <Text style={styles.description}>
          We couldn’t find the page you were looking for. Let's get you back on track.
        </Text>

        {/* Go Back Link */}
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Return Home</Text>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDE9FF', // Soft lilac background
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    position: 'relative',
  },
  decorativeCircle: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#E5FF98', // Soft yellow
    opacity: 0.3,
    top: -40,
    right: -50,
  },
  decorativeCorner: {
    position: 'absolute',
    width: 150,
    height: 150,
    backgroundColor: '#C5B9FF', // Light purple
    borderBottomRightRadius: 150,
    bottom: -20,
    left: -20,
    opacity: 0.4,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  illustrationText: {
    fontSize: 80,
    fontWeight: '800',
    color: '#4E4AFD', // Deep purple for focus
  },
  illustrationSubtext: {
    fontSize: 18,
    color: '#5E5A82', // Dark lilac-gray for subtle text
    marginTop: -10,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#5E5A82', // Dark lilac-gray title
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#5E5A82', // Dark lilac-gray for readability
    marginBottom: 30,
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  link: {
    backgroundColor: '#4E4AFD', // Purple button for emphasis
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  linkText: {
    color: '#EDE9FF', // Soft lilac text for contrast
    fontWeight: 'bold',
    fontSize: 16,
  },
});
