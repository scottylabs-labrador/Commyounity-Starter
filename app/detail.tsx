import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, Linking } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "expo-router";
import { useRoute } from "@react-navigation/native";

const DetailScreen = () => {
  const router = useRoute();
  const event = router.params.event;
  const navigation = useNavigation();

  const handleCalendar = async () => {
    navigation.navigate("calendar");
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <ImageBackground
        style={styles.header}
      >
        <Text style={styles.eventTitle}>{event.name}</Text>
        <View style={styles.iconGroup}>
          <TouchableOpacity onPress={handleCalendar}>
            <Image
              source={require("../assets/images/calendar.png")}
              style={styles.calendarIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name={'heart-outline'}
              size={32}
              color={'white'}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>   

      {/* Description */}
      <View style={styles.descriptionSection}>
        <Text style={styles.descriptionLabel}>Description:</Text>
        <Text style={styles.descriptionText}>
          Pretend this is a description of an event. I know I could’ve just done filler text but I’m just writing this
          anyway. Idk how long you guys want this so I’m just gonna stop here at 4 lines? and it can expand too.
        </Text>
        <TouchableOpacity onPress={() => Linking.openURL("https://and_then_this_is_a_url.comorwhatever")}>
          <Text style={styles.readMore}>Read more...</Text>
        </TouchableOpacity>
      </View>

      {/* Tags */}
      <View style={styles.tagsContainer}>
        {[event.tags].map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      {/* Recommended Section */}
    <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Recommended</Text>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  header: {
    height: 220,
    overflow: "hidden",
    justifyContent: "space-between",
    alignItems: "flex-end",
    backgroundColor: "#C5B9FF",
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 5
  },
  iconGroup: {
    flexDirection: "row"
  },
  calendarIcon: {
    width: 25,
    height: 27,
    marginRight: 10,
    marginTop: 3
  },
  eventTitle: {
    fontSize: 26,
    fontWeight: "bold",
  },
  descriptionSection: {
    marginHorizontal: 22,
    marginVertical: 16,
  },
  descriptionLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  descriptionText: {
    fontSize: 13,
    color: "#A1A1A1",
    marginTop: 8,
  },
  readMore: {
    color: "#A1A1A1",
    textDecorationLine: "underline",
    marginTop: 3,
  },
  tagsContainer: {
    marginVertical: 8,
    marginHorizontal: 22,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  tag: {
    backgroundColor: "#E5FF98",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 21,
  },
  tagText: {
    fontSize: 12,
  },
  sectionContainer: {
    marginLeft: 22
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
    backgroundColor: "#E0D7F9",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  gridText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
  }
});

export default DetailScreen;
