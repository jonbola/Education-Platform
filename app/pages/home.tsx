import React, { useState } from "react";
import { DrawerActions, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { FlatList, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { Button, IconButton, Text, TextInput } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useUserContext } from "../providers/user";
import { ThemeColor } from "@/assets/colors/theme-colors";
import { RootParams } from "../_layout";
import { isSmartPhoneSize } from "../utils/isSmartPhoneSize";
import CourseProvider, { useCourseContext } from "../providers/course";
import CourseCard from "../utils/course-card";

type NavigationProps = NativeStackNavigationProp<RootParams>;
type RouteProps = RouteProp<RootParams, "MainLayout">;
type HeadSectionProps = {
    navigation: NavigationProps;
};
type BodySectionProps = {
    navigation: NavigationProps;
};

export default function HomePage() {
    const navigation = useNavigation<NavigationProps>();

    return (
        <CourseProvider>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container} >
                <ScrollView>
                    <HeadSection navigation={navigation} />
                    <BodySection navigation={navigation} />
                </ScrollView>
            </KeyboardAvoidingView >
        </CourseProvider>
    );
}

function HeadSection(props: HeadSectionProps) {
    const { isLogged } = useUserContext();

    return (
        <View style={styles.head}>
            <IconButton
                icon="menu" size={hp(4)}
                onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer)} />
            <Image style={styles.logo} source={require("@/assets/images/img_logo.png")} />
            {isLogged ?
                <View>
                    <IconButton icon="cart-variant" size={hp(5)} />
                </View>
                :
                <View style={styles.sub_head}>
                    <Button mode="contained-tonal" style={styles.button} labelStyle={{ fontSize: hp(1.7) }}
                        children="LOG IN" onPress={() => props.navigation.navigate("LogInPage")} />
                </View>
            }
        </View>
    );
};

function BodySection(props: BodySectionProps) {
    const route = useRoute<RouteProps>();
    const { courseList } = useCourseContext();
    const [searchText, setSearchText] = useState<string>("");
    const filteredCourseList = courseList.filter((course) => course._name.toLowerCase().includes(searchText.toLowerCase()));
    const topSaleCourseList = courseList.sort((a, b) => b._sale - a._sale).slice(0, 5);

    return (
        <View style={styles.body}>
            {/*Course search bar */}
            <TextInput
                mode="outlined" outlineStyle={{ borderWidth: 2, borderRadius: 15, borderColor: "green" }}
                label="Search courses" placeholder="What do you need?"
                style={{ width: wp(50), height: hp(7) }} right={<TextInput.Icon icon="magnify" onPress={() => props.navigation.navigate("SearchPage", { searchText: searchText })} />}
                value={searchText} onChangeText={(newText) => setSearchText(newText)}
                onKeyPress={(event) => event.nativeEvent.key === "Enter" ? props.navigation.navigate("SearchPage", { searchText: searchText }) : null}
                onSubmitEditing={() => props.navigation.navigate("SearchPage", { searchText: searchText })} />
            {/*Type ahead course list */}
            {searchText.length > 0 ?
                <View style={styles.type_ahead_list_container}>
                    <FlatList data={filteredCourseList} keyExtractor={(course) => course._id.toString()}
                        renderItem={({ item }) => <CourseCard mode="search" course={item} />} />
                </View>
                : null}
            <View style={{ height: hp(10) }} />
            <View style={styles.underline}>
                <Text style={styles.header_text}>TOP SALE </Text>
            </View>
            {/*Top 5 sale course list */}
            <View style={styles.top_sale_container}>
                <FlatList horizontal={true} data={topSaleCourseList}
                    keyExtractor={(course) => course._id.toString()}
                    renderItem={({ item }) => <CourseCard mode="display" course={item} />} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        backgroundColor: "white"
    },
    type_ahead_list_container: {
        position: "absolute",
        top: hp(9.5),
        zIndex: 999,
        width: wp(50),
        backgroundColor: ThemeColor.Yellow_Green
    },
    top_sale_container: {
        flexDirection: "row",
        alignItems: "center",
        width: wp(100),
        height: hp(30),
        backgroundColor: ThemeColor.Yellow_Green
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
    },
    underline: {
        width: wp(100),
        borderBottomWidth: 3,
        borderColor: ThemeColor.Olive_Green
    },
    header_text: {
        alignSelf: "flex-start",
        marginStart: wp(5),
        fontSize: hp(5),
        color: ThemeColor.Olive_Green
    }
});