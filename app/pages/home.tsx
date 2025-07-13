import React, { useEffect, useState } from "react";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Image, KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, IconButton, Menu, TextInput } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useUserContext } from "../providers/user";
import { ThemeColor } from "@/assets/colors/theme-colors";
import { RootParams } from "../_layout";
import { isSmartPhoneSize } from "../utils/isSmartPhoneSize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Account } from "@/models/account";

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
    const [actionMenuVisible, setActionMenuVisible] = useState<boolean>(false);

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
                : isSmartPhoneSize() ?
                    <View>
                        <Menu
                            visible={actionMenuVisible} anchor={
                                <IconButton
                                    icon="dots-vertical" size={hp(4)}
                                    onPress={() => setActionMenuVisible(true)} onBlur={() => setActionMenuVisible(false)} />}>
                            <Menu.Item title="LOG IN" />
                            <Menu.Item title="SIGN UP" />
                        </Menu>
                    </View>
                    : <View style={styles.sub_head}>
                        <Button mode="contained-tonal" style={styles.button}
                            children="LOG IN" onPress={() => navigation.navigate("LogInPage")} />
                        <View style={{ width: 10 }} />
                        <Button mode="elevated" style={styles.button}
                            children="SIGN UP" onPress={() => navigation.navigate("SignUpPage")} />
                    </View>
            }
        </KeyboardAvoidingView >
    );
};

function BodySection() {
    const [searchText, setSearchText] = useState<string>("");
    const [userList, setUserList] = useState<Account[]>([]);

    useEffect(() => {
        async function fetchRecords() {
            try {
                const userList = await AsyncStorage.getItem("users");

                if (userList != null) {
                    const formattedList = JSON.parse(userList);
                    setUserList(formattedList);
                }
            }
            catch (error) {
                console.log("Cannot fetch user list from AsyncStorage");
            }
        };

        fetchRecords();
    }, []);

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
        borderBottomColor: "green"
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
        width: isSmartPhoneSize() ? wp(30) : wp(8),
        height: hp(8)
    },
    button: {
        height: hp(5)
    }
});