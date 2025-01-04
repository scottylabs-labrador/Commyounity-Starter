import React, {useState} from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, Linking } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { useAuth } from "./AuthContext";

const DetailScreen = () => {
  const router = useRoute();
  const event = router.params.event;
  const navigation = useNavigation();
  const { account } = useAuth();
  const [liked, setLiked] = useState(event.liked);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showExpandButton, setShowExpandButton] = useState(false);
  const lineHeight = 20; // this should be the same as in style
  const maxLines = 3;

  const handleCalendar = async () => {
    navigation.navigate("calendar");
  }

  const handleTextLayout = (e) => {
    const fullHeight = e.nativeEvent.layout.height;
    const maxHeight = maxLines * lineHeight;
    if (fullHeight > maxHeight) { 
      // more than 3 lines, need to have expand/show button
      setShowExpandButton(true); 
    }
  };

  const toggleLike = async () => {

    const action = liked ? "remove" : "add";
    setLiked(!liked);
  
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/add-likes/?username=${account}&event=${event.id}&action=${action}`
      );
  
      if (!response.ok) {
        window.alert("Failed to update like status on the server");
        setLiked(!liked);
      }
    } catch (error) {
        window.alert("Failed to update like status on the server");
        setLiked(!liked);
    }
  };

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
          <TouchableOpacity onPress={toggleLike}>
            <Ionicons
              name={liked ? 'heart' : 'heart-outline'}
              size={32}
              color={liked ? '#4E4AFD' : 'white'}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>   

      {/* Description */}
      <View style={styles.descriptionSection}>
        <Text style={styles.descriptionLabel}>Description:</Text>
        {/* should limit to 3 lines if there is a button & it is hidden*/}
        <Text 
          style= {styles.descriptionText}
          numberOfLines={showExpandButton && !isExpanded ? 3 : undefined}
          ellipsizeMode="tail"
          onLayout={handleTextLayout}
        >
          {event.description}
        </Text>
        {/* show button only if enabled */}
        {/* expand only if enabled */}
        {showExpandButton && (
          <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
            <Text style={styles.expand}>
              {isExpanded ? "Show less" : "Expand"}
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => Linking.openURL(event.link)}>
          <Text style={styles.readMore}>See external link...</Text>
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
    flexGrow: 1,
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
    lineHeight: 20
  },
  expand: {
    color: "#A1A1A1",
    textDecorationLine: "underline",
    marginTop: 3,
  },
  readMore: {
    color: "#C5B9FF",
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
