import React from "react";
import { StyleSheet, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"

export default function LogInPage() {
    return (
        <View style={styles.container}>
        </View>
    );
}

function HeadSection() {
    return (
        <View style={styles.head}>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex"
    },
    head: {
        width: wp(100),
        height: hp(20)
    },
    body: {
        width: wp(100),
        height: hp(70)
    },
    bottom: {
        width: wp(100),
        height: hp(10)
    }
});