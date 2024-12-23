import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Svg, Circle, Ellipse } from 'react-native-svg';

export default function SmileyFace() {
    return (
        <View style={styles.component1Container}>
            <Svg style={styles.ellipse1} width="151" height="151" viewBox="0 0 151 151" fill="none" >
                <Circle cx="75.5" cy="75.5" r="75.5" fill="#E5FF98"/>
            </Svg>

            <Svg style={styles.ellipse2} width="14" height="30" viewBox="0 0 14 30" fill="none" >
                <Ellipse cx="6.86512" cy="14.7512" rx="6.32093" ry="14.3977" fill="black"/>
            </Svg>

            <Svg style={styles.ellipse3} width="14" height="30" viewBox="0 0 14 30" fill="none" >
                <Ellipse cx="6.83729" cy="14.7512" rx="6.32093" ry="14.3977" fill="black"/>
            </Svg>

            <View style={styles.rectangle1}/>
            <Svg style={styles.ellipse24} width="20" height="12" viewBox="0 0 20 12" fill="none" >
                <Ellipse cx="9.85111" cy="5.83723" rx="9.83256" ry="5.6186" fill="#FFC7C1"/>
            </Svg>
        </View>)
}

const styles = StyleSheet.create({
    component1Container: {
        position: "relative",
        flexShrink: 0,
        height: 151,
        width: 151,
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
        top: 46,
        right: 95,
        bottom: 76,
        left: 44,
        overflow: "visible"
    },
    ellipse3: {
        position: "absolute",
        flexShrink: 0,
        top: 46,
        right: 43,
        bottom: 76,
        left: 96,
        overflow: "visible"
    },
    rectangle1: {
        position: "absolute",
        flexShrink: 0,
        top: 84,
        right: 60,
        bottom: 44,
        left: 60,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        backgroundColor: "rgba(254, 1, 230, 1)"
    },
    ellipse24: {
        position: "absolute",
        flexShrink: 0,
        top: 96,
        right: 65,
        bottom: 44,
        left: 66,
        overflow: "visible"
    }
});