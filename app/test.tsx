import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const App = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showExpandButton, setShowExpandButton] = useState(false);
  const lineHeight = 24; // Line height for the text
  const maxLines = 3;

  const handleTextLayout = (e) => {
    console.log("aaaaa")
    const fullHeight = e.nativeEvent.layout.height;
    const maxHeight = maxLines * lineHeight;
    if (fullHeight > maxHeight) {
      setShowExpandButton(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.text,
          isExpanded || !showExpandButton ? null : { height: maxLines * lineHeight, overflow: "hidden" },
        ]}
        onLayout={handleTextLayout}
      >
        This is a long description. This is a long description. This is a long description.
        This is a long description. This is a long description. This is a long description.
      </Text>
      {showExpandButton && (
        <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
          <Text style={styles.expandButton}>Expand</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFF",
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
  expandButton: {
    marginTop: 8,
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default App;
