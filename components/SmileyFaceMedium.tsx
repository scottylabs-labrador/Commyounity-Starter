import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Svg, Circle, Ellipse } from 'react-native-svg';

export default function SmileyFaceMedium() {
    return (
        <View style={styles.component1Container}>
            <Svg style={styles.ellipse1} width="109" height="109" viewBox="0 0 109 109" fill="none" >
<Circle cx="54.5" cy="54.5" r="54.5" fill="#E5FF98"/>
</Svg>

            <Svg style={styles.ellipse2} width="10" height="22" viewBox="0 0 10 22" fill="none" >
<Ellipse cx="4.99541" cy="10.8535" rx="4.56279" ry="10.393" fill="black"/>
</Svg>

            <Svg style={styles.ellipse3} width="11" height="22" viewBox="0 0 11 22" fill="none" >
<Ellipse cx="5.51152" cy="10.8535" rx="4.56279" ry="10.393" fill="black"/>
</Svg>

            <View style={styles.rectangle1}/>
            <Svg style={styles.ellipse24} width="15" height="9" viewBox="0 0 15 9" fill="none" >
<Ellipse cx="7.75344" cy="4.51163" rx="7.09767" ry="4.05582" fill="#FFC7C1"/>
</Svg>

        </View>  )
}

const styles = StyleSheet.create({
    component1Container: {
        position: "relative",
        flexShrink: 0,
        height: 109,
        width: 109,
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
        top: 33,
        right: 68,
        bottom: 55,
        left: 31,
        overflow: "visible"
    },
    ellipse3: {
        position: "absolute",
        flexShrink: 0,
        top: 33,
        right: 31,
        bottom: 55,
        left: 69,
        overflow: "visible"
    },
    rectangle1: {
        position: "absolute",
        flexShrink: 0,
        top: 61,
        right: 43,
        bottom: 31,
        left: 43,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        backgroundColor: "rgba(254, 1, 230, 1)"
    },
    ellipse24: {
        position: "absolute",
        flexShrink: 0,
        top: 69,
        right: 47,
        bottom: 31,
        left: 48,
        overflow: "visible"
    }
});