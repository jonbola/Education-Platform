import React, { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, StyleSheet, View } from "react-native";
import { Button, IconButton, Text, TextInput } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import { RootParams } from "../_layout";
import { useNavigation } from "@react-navigation/native";
import { ThemeColor } from "@/assets/colors/theme-colors";
import { isSmartPhoneSize } from "../utils/isSmartPhoneSize";
import { useUserContext } from "../providers/user";
import AccountProvider, { useAccountContext } from "../providers/account";
import { Account } from "@/models/account";

type NavigationProps = NativeStackNavigationProp<RootParams>;
type HeadSectionProps = {
    navigation: NavigationProps;
}
type BodySectionProps = {
    navigation: NavigationProps;
}

export default function LogInPage() {
    const navigation = useNavigation<NavigationProps>();

    return (
        <AccountProvider>
            <View style={styles.container}>
                <HeadSection navigation={navigation} />
                <BodySection navigation={navigation} />
            </View>
        </AccountProvider>
    );
}

function HeadSection(props: HeadSectionProps) {
    return (
        <View style={styles.head}>
            <IconButton icon="keyboard-backspace" onPress={() => props.navigation.goBack()} />
            <Image style={styles.logo} source={require("@/assets/images/img_logo.png")} />
            <View />
        </View>
    );
};

function BodySection(props: BodySectionProps) {
    const [accountNameText, setAccountNameText] = useState<string>("");
    const [passwordText, setPasswordText] = useState<string>("");
    const [accountNameFieldColor, setAccountNameFieldColor] = useState<string>(ThemeColor.Lime_Green);
    const [passwordFieldColor, setPasswordFieldColor] = useState<string>(ThemeColor.Lime_Green)
    const [logInButtonColor, setLogInButtonColor] = useState<string>(ThemeColor.Olive_Green);
    const [isPasswordTextSecured, setPasswordTextSecured] = useState<boolean>(true);
    const { setLoggedState } = useUserContext();
    const { accountList } = useAccountContext();

    return (
        <View style={styles.body}>
            <Text style={styles.titleText}>LOG IN</Text>
            <View style={{ height: 30 }} />
            <TextInput
                mode="outlined" autoCapitalize="none" outlineStyle={[styles.textInputOutline, { borderColor: accountNameFieldColor }]}
                label="Account name" placeholder="Type account name here" style={styles.textInput}
                value={accountNameText} onChangeText={(newText) => setAccountNameText(newText)}
                onFocus={() => setAccountNameFieldColor(ThemeColor.Olive_Green)} onBlur={() => setAccountNameFieldColor(ThemeColor.Lime_Green)} />
            <View style={{ height: 10 }} />
            <TextInput
                mode="outlined" autoCapitalize="none" outlineStyle={[styles.textInputOutline, { borderColor: passwordFieldColor }]}
                label="Password" placeholder="Type password here"
                value={passwordText} onChangeText={(newText) => setPasswordText(newText)}
                secureTextEntry={isSmartPhoneSize() ? isPasswordTextSecured : true} style={styles.textInput}
                right={isSmartPhoneSize() ? <TextInput.Icon icon={isPasswordTextSecured ? "eye-outline" : "eye-off-outline"} onPress={() => setPasswordTextSecured(!isPasswordTextSecured)} /> : undefined}
                onFocus={() => setPasswordFieldColor(ThemeColor.Olive_Green)} onBlur={() => setPasswordFieldColor(ThemeColor.Lime_Green)} />
            <View style={{ height: 10 }} />
            <Button style={[styles.button, { backgroundColor: logInButtonColor }]} labelStyle={{ color: "white" }}
                onPointerEnter={() => setLogInButtonColor(ThemeColor.Green)} onPointerLeave={() => setLogInButtonColor(ThemeColor.Olive_Green)}
                onPress={() => {
                    if (isAccountVerified(accountList, accountNameText, passwordText)) {
                        setLoggedState(true);
                        props.navigation.navigate("MainLayout");
                    }
                }}>LOG IN</Button>
            <View style={{ height: 10 }} />
            <Button labelStyle={styles.linkText}
                onPress={() => props.navigation.navigate("SignUpPage")}>Don't have an account?</Button>
        </View>
    );
};

function isAccountVerified(accountList: Account[], accountNameText: string, passwordText: string): boolean {
    if (accountNameText != "" && passwordText != "") {
        const existingAccount = accountList.find((account) => account._accountName === accountNameText);

        if (existingAccount != null) {
            if (passwordText === existingAccount._password) {
                return true;
            }
            else {
                alert("Account name or password is invalid!");
                return false;
            }
        }
        else {
            alert("Account is not existing!");
            return false;
        }
    }
    else {
        alert("All fields should not be empty!");
        return false;
    }
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
        justifyContent: "center",
        alignItems: "center",
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
        width: isSmartPhoneSize() ? wp(25) : wp(8),
        height: isSmartPhoneSize() ? hp(7) : hp(8)
    },
    titleText: {
        fontSize: hp(5),
        color: ThemeColor.Olive_Green,
    },
    linkText: {
        fontWeight: "normal",
        fontStyle: "italic",
        fontSize: 15,
        textDecorationLine: "underline",
        color: "#05445E"
    },
    textInput: {
        width: isSmartPhoneSize() ? wp(70) : wp(30),
        height: hp(7),
    },
    textInputOutline: {
        borderWidth: 3,
        borderRadius: 15
    },
    button: {
        width: isSmartPhoneSize() ? wp(30) : wp(7),
        height: hp(6),
        borderWidth: 3,
        borderColor: ThemeColor.Lime_Green
    }
});