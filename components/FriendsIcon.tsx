import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Svg, Path, Circle } from 'react-native-svg';

export default function People() {
    return (
        <View style={styles.peopleContainer}>
            <Svg style={styles.person} width="24" height="34" viewBox="0 0 24 34" fill="none" >
<Path d="M0.497559 28.4644C0.497559 22.013 5.72744 16.7831 12.1788 16.7831C18.6302 16.7831 23.8601 22.013 23.8601 28.4644V33.4706H0.497559V28.4644Z" fill="#4E4AFD"/>
<Circle cx="11.8784" cy="7.20443" r="6.67501" fill="#4E4AFD"/>
</Svg>

            <Svg style={styles.person} width="30" height="40" viewBox="0 0 30 40" fill="none" >
<Path d="M15.1788 18.2831C7.89901 18.2831 1.99756 24.1845 1.99756 31.4644V35.3789C1.99756 36.8103 3.15791 37.9706 4.58927 37.9706H25.7684C27.1998 37.9706 28.3601 36.8103 28.3601 35.3789V31.4644C28.3601 24.1845 22.4586 18.2831 15.1788 18.2831Z" fill="white" stroke="#C5B9FF" strokeWidth="3"/>
<Circle cx="14.8784" cy="10.2044" r="8.17501" fill="white" stroke="#C5B9FF" strokeWidth="3"/>
</Svg>

            <Svg style={styles.person} width="30" height="40" viewBox="0 0 30 40" fill="none" >
<Path d="M15.1788 18.2831C7.89901 18.2831 1.99756 24.1845 1.99756 31.4644V35.3789C1.99756 36.8103 3.15791 37.9706 4.58927 37.9706H25.7684C27.1998 37.9706 28.3601 36.8103 28.3601 35.3789V31.4644C28.3601 24.1845 22.4586 18.2831 15.1788 18.2831Z" fill="white" stroke="#C5B9FF" strokeWidth="3"/>
<Circle cx="14.8784" cy="10.2044" r="8.17501" fill="white" stroke="#C5B9FF" strokeWidth="3"/>
</Svg>

        </View>  )
}

const styles = StyleSheet.create({
    peopleContainer: {
        position: "relative",
        flexShrink: 0,
        height: 39,
        width: 55,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: 0
    },
    person: {
        position: "absolute",
        flexShrink: 0,
        height: 33,
        left: 16,
        width: 23
    },
    _person: {
        position: "absolute",
        flexShrink: 0,
        top: 6,
        height: 33,
        width: 23
    },
    __person: {
        position: "absolute",
        flexShrink: 0,
        top: 6,
        height: 33,
        left: 32,
        width: 23
    }
});