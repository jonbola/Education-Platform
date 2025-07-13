import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { IconButton, Text, TextInput } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import { RootParams } from "../_layout";
import { useNavigation } from "@react-navigation/native";
import { ThemeColor } from "@/assets/colors/theme-colors";
import { isSmartPhoneSize } from "../utils/isSmartPhoneSize";

type NavigationProps = NativeStackNavigationProp<RootParams>;

export default function LogInPage() {
    return (
        <View style={styles.container}>
            <HeadSection />
            <BodySection />
        </View>
    );
}

function HeadSection() {
    const navigation = useNavigation<NavigationProps>();

    return (
        <View style={styles.head}>
            <IconButton icon="keyboard-backspace" onPress={() => navigation.goBack()} />
            <Image style={styles.logo} source={require("@/assets/images/img_logo.png")} />
            <View />
        </View>
    );
};

function BodySection() {
    const [accountNameFieldColor, setAccountNameFieldColor] = useState<string>(ThemeColor.Lime_Green);
    const [passwordFieldColor, setPasswordFieldColor] = useState<string>(ThemeColor.Lime_Green)

    return (
        <View style={styles.body}>
            <Text style={styles.titleText}>LOG IN</Text>
            <View style={{ height: 50 }} />
            <TextInput
                mode="outlined" outlineStyle={{ borderWidth: 3, borderRadius: 15, borderColor: accountNameFieldColor }}
                label="Account name" placeholder="Type account name here" style={{ width: wp(30), height: hp(7) }}
                onFocus={() => setAccountNameFieldColor(ThemeColor.Olive_Green)} onBlur={() => setAccountNameFieldColor(ThemeColor.Lime_Green)} />
            <View style={{ height: 20 }} />
            <TextInput
                mode="outlined" outlineStyle={{ borderWidth: 3, borderRadius: 15, borderColor: passwordFieldColor }}
                label="Password" placeholder="Type password here"
                secureTextEntry={true} style={{ width: wp(30), height: hp(7) }}
                onFocus={() => setPasswordFieldColor(ThemeColor.Olive_Green)} onBlur={() => setPasswordFieldColor(ThemeColor.Lime_Green)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        backgroundColor: "white"
    },
    head: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        width: wp(100),
        height: hp(10),
        borderBottomWidth: 3,
        borderBottomColor: ThemeColor.Olive_Green,
        backgroundColor: ThemeColor.Yellow_Green
    },
    body: {
        paddingVertical: 10,
        paddingHorizontal: wp(10),
        width: wp(100),
        height: hp(70)
    },
    bottom: {
        width: wp(100),
        height: hp(10)
    },
    logo: {
        width: isSmartPhoneSize() ? wp(12) : wp(8),
        height: hp(8)
    },
    titleText: {
        alignSelf: "center",
        fontSize: hp(5),
        color: ThemeColor.Olive_Green,
    }
});