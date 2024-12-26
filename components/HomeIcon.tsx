import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Svg, Path } from 'react-native-svg';

export default function HomeIcon() {
    return (
        <View style={styles.homeContainer}>
            <Svg style={styles.home} width="35" height="38" viewBox="0 0 35 38" fill="none" >
<Path fillRule="evenodd" clipRule="evenodd" d="M16.0857 0.383791L1 8.63641H1.19783C0.463723 9.27799 0 10.2212 0 11.2728V34.5C0 36.433 1.567 38 3.5 38H31.5C33.433 38 35 36.433 35 34.5V11.2728C35 10.2212 34.5363 9.27799 33.8022 8.63641H34L19.3857 0.383777C18.6314 -0.311179 16.4 0.094226 16.0857 0.383791ZM14 22.0227C12.8954 22.0227 12 22.9182 12 24.0227V38H23V24.0227C23 22.9182 22.1046 22.0227 21 22.0227H14Z" fill="white"/>
</Svg>

        </View>  )
}

const styles = StyleSheet.create({
    homeContainer: {
        position: "relative",
        flexShrink: 0,
        height: 38,
        width: 35,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: 0
    },
    home: {
        position: "absolute",
        flexShrink: 0,
        width: 35,
        height: 38,
        overflow: "visible"
    }
});