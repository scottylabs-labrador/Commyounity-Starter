import React , { useState , useEffect} from "react";
import SmileyFace from "@/components/SmileyFace";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet , TextInput} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useAuth } from "../AuthContext";
import { useSegments } from 'expo-router';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { account, setAccount } = useAuth();
  const segments = useSegments();

  // State for username and biography
  const [username, setUsername] = useState("Unlogged In User");
  const [biography, setBiography] = useState(
    "Hi! Feel free to log in or register to access all features of Comm-you-nity :)"
  );
  const [isEditing, setIsEditing] = useState(false);
  const [interests, setInterests] = useState<string[]>([]);

  const saveProfile = async () => {
    if(account)
    {
      const url = 'http://127.0.0.1:8000/api/update-profile/';
      const payload = {
          username,
          biography,
          account
      };
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    
      if (response.status == 200) {
        window.alert('Profile updated successfully.');
      } else {
        window.alert('Failed to update account.');
      }
    }
  };

  const logout = async () => {
    setAccount("");
    navigation.navigate("index");
  };

  const customize = async () => {
    navigation.navigate("customize");
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch( `http://127.0.0.1:8000/api/get-profile?account=${account}`)
        const data = await response.json();

        setUsername(data.nickname);
        setBiography(data.bio);
        const lowercaseList: string[] = data.interests.map(str => str.toLowerCase());
        setInterests(lowercaseList);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (account) {
      fetchProfile();
    }
  }, [segments]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.profilePicture}>
          <SmileyFace />
        </View>

        {isEditing ? (
          <TextInput
            style={styles.editableUsername}
            value={username}
            onChangeText={setUsername}
          />
        ) : (
          <Text style={styles.username}>{username}</Text>
        )}

        {isEditing ? (
          <TextInput
            style={styles.editableBio}
            value={biography}
            onChangeText={setBiography}
            multiline
          />
        ) : (
          <Text style={styles.bio}>{biography}</Text>
        )}
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.shareButton]}
          onPress={() => {
            if (isEditing) {
              saveProfile();
            }
            toggleEditing();
          }}
        >
          <Text style={styles.buttonText}>
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={logout}
        >
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionContainer}>
        <View>
          <Text style={styles.sectionTitle}>My past events</Text>
          <ScrollView horizontal={true}>
            <View style={styles.grid}>
              <View style={styles.gridItem} />
              <View style={styles.gridItem} />
              <View style={styles.gridItem} />
              <View style={styles.gridItem} />
              <View style={styles.gridItem} />
            </View>
          </ScrollView>
        </View>

        {/* Interests */}
        <View>
          <Text style={styles.sectionTitle}>My interests</Text>
          <ScrollView horizontal={true}>
            <View style={styles.grid}>
              <TouchableOpacity style={styles.gridItem} onPress={customize}>
                <Ionicons name="add-circle" size={28} color="white" />
              </TouchableOpacity>
              {interests.map((item, index) => (
                <View key={index} style={styles.gridItem}>
                  <Text style={styles.gridText}>{item}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
      {/* Past Events */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#E9FFCA",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bio: {
    fontSize: 14,
    color: "#555",
    textAlign: "center"
  },
  editableUsername: { 
    fontSize: 18, 
    fontWeight: "bold", 
    marginBottom: 8, 
    borderBottomWidth: 1 
  },
  editableBio: { 
    width: "90%",
    fontSize: 14, 
    color: "#555",
    textAlign: "center", 
    borderWidth: 1, 
    padding: 15, 
    borderRadius: 5 
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 7,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  shareButton: {
    backgroundColor: "#4A61DD",
  },
  editButton: {
    backgroundColor: "#4A61DD",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  sectionContainer: {
   
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  grid: {
    flexDirection: "row",
    flexWrap: 'wrap',
    justifyContent: "space-between",
    marginBottom: 10,
  },
  gridItem: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: "#C5B9FF",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  gridText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  }
});

export default ProfileScreen;
