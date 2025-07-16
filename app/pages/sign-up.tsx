import React, { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, StyleSheet, View } from "react-native";
import { Button, IconButton, Text, TextInput } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import { RootParams } from "../_layout";
import { useNavigation } from "@react-navigation/native";
import { ThemeColor } from "@/assets/colors/theme-colors";
import { isSmartPhoneSize } from "../utils/isSmartPhoneSize";
import { useAccountContext } from "../providers/account";
import { Account } from "@/models/account";
import AsyncStorage from "@react-native-async-storage/async-storage";

type NavigationProps = NativeStackNavigationProp<RootParams>;
type HeadSectionProps = {
    navigation: NavigationProps;
}
type BodySectionProps = {
    navigation: NavigationProps;
}

export default function SignUpPage() {
    const navigation = useNavigation<NavigationProps>();

    return (
        <View style={styles.container}>
            <HeadSection navigation={navigation} />
            <BodySection navigation={navigation} />
        </View>
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
    const { accountList } = useAccountContext();
    const [accountNameText, setAccountNameText] = useState<string>("");
    const [passwordText, setPasswordText] = useState<string>("");
    const [reEnterPasswordText, setReEnterPasswordText] = useState<string>("");
    const [accountNameFieldColor, setAccountNameFieldColor] = useState<string>(ThemeColor.Lime_Green);
    const [passwordFieldColor, setPasswordFieldColor] = useState<string>(ThemeColor.Lime_Green)
    const [reEnterPasswordFieldColor, setReEnterPasswordFieldColor] = useState<string>(ThemeColor.Lime_Green)
    const [signUpButtonColor, setSignUpButtonColor] = useState<string>(ThemeColor.Olive_Green);
    const [isPasswordTextSecured, setPasswordTextSecured] = useState<boolean>(true);
    const [isReEnterPasswordTextSecured, setReEnterPasswordTextSecured] = useState<boolean>(true);

    return (
        <View style={styles.body}>
            <Text style={styles.titleText}> SIGN UP</Text>
            <View style={{ height: 30 }} />
            {/*Account name field */}
            <TextInput
                mode="outlined" autoCapitalize="none" outlineStyle={[styles.textInputOutline, { borderColor: accountNameFieldColor }]}
                label="Account name" placeholder="Type account name here" style={styles.textInput}
                value={accountNameText} onChangeText={(newText) => setAccountNameText(newText)}
                onFocus={() => setAccountNameFieldColor(ThemeColor.Olive_Green)} onBlur={() => setAccountNameFieldColor(ThemeColor.Lime_Green)} />
            <View style={{ height: 10 }} />
            {/*Password field */}
            <TextInput
                mode="outlined" autoCapitalize="none" outlineStyle={[styles.textInputOutline, { borderColor: passwordFieldColor }]}
                label="Password" placeholder="Type password here"
                value={passwordText} onChangeText={(newText) => setPasswordText(newText)}
                secureTextEntry={isSmartPhoneSize() ? isPasswordTextSecured : true} style={styles.textInput}
                right={isSmartPhoneSize() ? <TextInput.Icon icon={isPasswordTextSecured ? "eye-outline" : "eye-off-outline"} onPress={() => setPasswordTextSecured(!isPasswordTextSecured)} /> : undefined}
                onFocus={() => setPasswordFieldColor(ThemeColor.Olive_Green)} onBlur={() => setPasswordFieldColor(ThemeColor.Lime_Green)} />
            <View style={{ height: 10 }} />
            {/*Re-enter password field */}
            <TextInput
                mode="outlined" autoCapitalize="none" outlineStyle={[styles.textInputOutline, { borderColor: reEnterPasswordFieldColor }]}
                label="Re-enter password" placeholder="Re-enter password here"
                value={reEnterPasswordText} onChangeText={(newText) => setReEnterPasswordText(newText)}
                secureTextEntry={isSmartPhoneSize() ? isReEnterPasswordTextSecured : true} style={styles.textInput}
                right={isSmartPhoneSize() ? <TextInput.Icon icon={isReEnterPasswordTextSecured ? "eye-outline" : "eye-off-outline"} onPress={() => setReEnterPasswordTextSecured(!isPasswordTextSecured)} /> : undefined}
                onFocus={() => setReEnterPasswordFieldColor(ThemeColor.Olive_Green)} onBlur={() => setReEnterPasswordFieldColor(ThemeColor.Lime_Green)} />
            <View style={{ height: 10 }} />
            {/*Create new account button */}
            <Button style={[styles.button, { backgroundColor: signUpButtonColor }]} labelStyle={{ color: "white" }}
                onPointerEnter={() => setSignUpButtonColor(ThemeColor.Green)} onPointerLeave={() => setSignUpButtonColor(ThemeColor.Olive_Green)}
                onPress={() => {
                    if (isAccountVerified(accountList, accountNameText, passwordText, reEnterPasswordText)) {
                        pushNewRecord(accountList, accountNameText, passwordText);
                        props.navigation.navigate("LogInPage", {});
                    }
                }}>SIGN UP</Button>
            <View style={{ height: 10 }} />
        </View>
    );
};

function isAccountVerified(accountList: Account[], accountNameText: string, passwordText: string, reEnterPasswordText: string): boolean {
    if (accountNameText != "" && passwordText != "" && reEnterPasswordText != "") {
        const existingAccount = accountList.find((account) => account._accountName === accountNameText);

        if (existingAccount == null) {
            if (passwordText == reEnterPasswordText) {
                return true;
            }
            else {
                alert("Re-enter password does not match password");
                return false;
            }
        }
        else {
            alert("Account is already existing!");
            return false;
        }
    }
    else {
        alert("All fields should not be empty!");
        return false;
    }
}

async function pushNewRecord(accountList: Account[], accountNameText: string, passwordText: string) {
    const currentMaxId = accountList.reduce((acc, curr) => Math.max(acc, curr._id), 0);
    //Localize ISO date
    const dateNow = new Date();
    const pad = (n: number) => n.toString().padStart(2, "0");
    const dateString = `${dateNow.getFullYear()}-${pad(dateNow.getMonth() + 1)}-${pad(dateNow.getDate())}T${pad(dateNow.getHours())}:${pad(dateNow.getMinutes())}:${pad(dateNow.getSeconds())}`;
    //Push new account record to AsyncStorage
    const account = new Account(currentMaxId + 1, accountNameText, passwordText, dateString, [], []);
    accountList.push(account);
    await AsyncStorage.setItem("accounts", JSON.stringify(accountList));
};

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