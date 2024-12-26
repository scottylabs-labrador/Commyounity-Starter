import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Svg, Circle, Mask, G, Path } from 'react-native-svg';

export default function ProfileIcon() {
    return (
        <View style={styles.profileContainer}>
            <Svg style={styles.ellipse23} width="41" height="40" viewBox="0 0 41 40" fill="none" >
                <Circle cx="20.8601" cy="20" r="20" fill="#4E4AFD"/>
            </Svg>

            <Svg style={styles.maskgroup} width="41" height="40" viewBox="0 0 41 40" fill="none" >
                <Mask id="mask0_321_272" maskUnits="userSpaceOnUse" x="0" y="0" width="41" height="40">
                    <Circle cx="20.8601" cy="20" r="20" fill="#A1A1A1"/>
                </Mask>
                <G mask="url(#mask0_321_272)">
                    <Path d="M8.86011 34.8936C8.86011 28.3132 14.1946 22.9787 20.775 22.9787C27.3554 22.9787 32.6899 28.3132 32.6899 34.8936V40H8.86011V34.8936Z" fill="white"/>
                    <Path d="M27.2771 13.2085C27.2771 16.9688 24.2289 20.017 20.4686 20.017C16.7084 20.017 13.6601 16.9688 13.6601 13.2085C13.6601 9.4483 16.7084 6.40002 20.4686 6.40002C24.2289 6.40002 27.2771 9.4483 27.2771 13.2085Z" fill="white"/>
                </G>
            </Svg>
        </View>  )
}

const styles = StyleSheet.create({
    profileContainer: {
        position: "relative",
        flexShrink: 0,
        height: 40,
        width: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: 0
    },
    ellipse23: {
        position: "absolute",
        flexShrink: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        overflow: "visible"
    },
    maskgroup: {
        position: "absolute",
        flexShrink: 0,
        height: 40,
        width: 40
    }
});