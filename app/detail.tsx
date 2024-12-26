import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, Linking } from "react-native";

const DetailScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <ImageBackground
        style={styles.header}
      >
        <View style={styles.headerIcons}>
          <Text style={styles.calendarIcon}>📅</Text>
          <Text style={styles.heartIcon}>❤️</Text>
        </View>
        <View style={styles.eventDetails}>
            <Text style={styles.eventTitle}>Event Title</Text>
        </View>
      </ImageBackground>

      {/* Event Title */}
      

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
        {["tagtagtag", "tag", "tagtag", "tagtagtag", "tag"].map((tag, index) => (
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
    backgroundColor: "#FFFFFF"
  },
  header: {
    height: 220,
    overflow: "hidden",
    justifyContent: "space-between",
    backgroundColor: "#C5B9FF"
  },
  headerIcons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
  calendarIcon: {
    fontSize: 24,
  },
  heartIcon: {
    fontSize: 24,
    marginLeft: 16,
  },
  eventDetails: {
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 5,
    alignItems: "flex-start",
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
