import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Svg, Circle, Ellipse } from 'react-native-svg';

export default function SmileyFaceSmall() {
    return (
        <View style={styles.component1Container}>
            <Svg style={styles.ellipse1} width="56" height="56" viewBox="0 0 56 56" fill="none" >
<Circle cx="28" cy="28" r="28" fill="#E5FF98"/>
</Svg>

            <Svg style={styles.ellipse2} width="5" height="11" viewBox="0 0 5 11" fill="none" >
<Ellipse cx="2.49311" cy="5.53023" rx="2.34419" ry="5.33953" fill="black"/>
</Svg>

            <Svg style={styles.ellipse3} width="6" height="11" viewBox="0 0 6 11" fill="none" >
<Ellipse cx="2.76753" cy="5.53023" rx="2.34419" ry="5.33953" fill="black"/>
</Svg>

            <View style={styles.rectangle1}/>
            <Svg style={styles.ellipse24} width="8" height="5" viewBox="0 0 8 5" fill="none" >
<Ellipse cx="4.1304" cy="2.76744" rx="3.64651" ry="2.08372" fill="#FFC7C1"/>
</Svg>

        </View>  )
}

const styles = StyleSheet.create({
    component1Container: {
        position: "relative",
        flexShrink: 0,
        height: 56,
        width: 56,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: 0
    },
    ellipse1: {
        position: "absolute",
        flexShrink: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        overflow: "visible"
    },
    ellipse2: {
        position: "absolute",
        flexShrink: 0,
        top: 17,
        right: 35,
        bottom: 28,
        left: 16,
        overflow: "visible"
    },
    ellipse3: {
        position: "absolute",
        flexShrink: 0,
        top: 17,
        right: 16,
        bottom: 28,
        left: 35,
        overflow: "visible"
    },
    rectangle1: {
        position: "absolute",
        flexShrink: 0,
        top: 31,
        right: 22,
        bottom: 16,
        left: 22,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        backgroundColor: "rgba(254, 1, 230, 1)"
    },
    ellipse24: {
        position: "absolute",
        flexShrink: 0,
        top: 36,
        right: 24,
        bottom: 16,
        left: 24,
        overflow: "visible"
    }
});