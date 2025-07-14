import React, { useState } from "react";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Image, KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, IconButton, TextInput } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useUserContext } from "../providers/user";
import { ThemeColor } from "@/assets/colors/theme-colors";
import { RootParams } from "../_layout";
import { isSmartPhoneSize } from "../utils/isSmartPhoneSize";

type NavigationProps = NativeStackNavigationProp<RootParams>;

export default function HomePage() {
    return (
        <View style={styles.container}>
            <HeadSection />
            <BodySection />
        </View>
    );
}

function HeadSection() {
    const navigation = useNavigation<NavigationProps>();
    const { isLogged } = useUserContext();

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.head} >
            <IconButton
                icon="menu" size={hp(4)}
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)} />
            <Image style={styles.logo} source={require("@/assets/images/img_logo.png")} />
            {isLogged ?
                <View>
                    <IconButton icon="cart-variant" size={hp(5)} />
                </View>
                :
                <View style={styles.sub_head}>
                    <Button mode="contained-tonal" style={styles.button} labelStyle={{ fontSize: hp(1.7) }}
                        children="LOG IN" onPress={() => navigation.navigate("LogInPage")} />
                </View>
            }
        </KeyboardAvoidingView >
    );
};

function BodySection() {
    const [searchText, setSearchText] = useState<string>("");

    return (
        <View style={styles.body}>
            <TextInput
                mode="outlined" outlineStyle={{ borderWidth: 2, borderRadius: 15, borderColor: "green" }}
                label="Search courses" placeholder="What do you need?"
                style={{ width: wp(50), height: hp(7) }} right={<TextInput.Icon icon="magnify" />}
                value={searchText} onChangeText={(newText) => setSearchText(newText)} />
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
        backgroundColor: ThemeColor.Yellow_Green,
        borderBottomWidth: 3,
        borderBottomColor: ThemeColor.Green
    },
    body: {
        flexDirection: "column",
        alignItems: "center",
        padding: 10,
        width: wp(100),
        height: hp(70),
    },
    sub_head: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10
    },
    logo: {
        width: isSmartPhoneSize() ? wp(25) : wp(8),
        height: isSmartPhoneSize() ? hp(7) : hp(8)
    },
    button: {
        height: hp(5),
    }
});