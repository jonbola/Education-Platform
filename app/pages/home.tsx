import React, { useState } from "react";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, useWindowDimensions, View } from "react-native";
import { Button, IconButton, Menu, TextInput } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RootProps } from "../_layout";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useUserContext } from "../providers/user";

type NavigationProps = NativeStackNavigationProp<RootProps>;
type HeadSectionProps = {
    deviceHeight: number;
}

export default function HomePage() {
    const { width, height } = useWindowDimensions();

    return (
        <View style={styles.container}>
            <HeadSection deviceHeight={height} />
            <BodySection />
        </View>
    );
}

function HeadSection(props: HeadSectionProps) {
    const navigation = useNavigation<NavigationProps>();
    const isSmartPhoneSize = props.deviceHeight >= 320 && props.deviceHeight <= 768;
    const { isLogged } = useUserContext();
    const [actionMenuVisible, setActionMenuVisible] = useState<boolean>(false);

    return (
        < View style={[styles.head, { borderBottomWidth: 3, borderBottomColor: "green" }]} >
            <IconButton
                icon="menu" size={hp(5)}
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)} />
            <Image style={styles.logo} source={require("@/assets/images/img_logo.png")} />
            {isLogged ?
                <View>
                    <IconButton icon="cart-variant" size={hp(5)} />
                </View>
                : isSmartPhoneSize ?
                    <View>
                        <Menu visible={actionMenuVisible} anchor={
                            <IconButton
                                icon="dots-vertical" size={hp(5)}
                                onPress={() => setActionMenuVisible(true)} onBlur={() => setActionMenuVisible(false)} />}>
                            <Menu.Item title="LOGIN IN" />
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
        </View >
    );
};

function BodySection() {
    const [searchText, setSearchText] = useState<string>("");

    return (
        <View style={styles.body}>
            <TextInput
                mode="outlined" outlineStyle={{borderWidth:2,borderRadius:15, borderColor: "green" }}
                label="Search" style={{ width: wp(50) }} value={searchText}
                onChangeText={(newText) => setSearchText(newText)} right={<TextInput.Icon icon="magnify"/>} />
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
        height: hp(15),
    },
    body: {
        flexDirection: "column",
        alignItems:"center",
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
        width: wp(10),
        height: hp(10)
    },
    button: {
        height: hp(5)
    }
});