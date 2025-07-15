import { ThemeColor } from "@/assets/colors/theme-colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { FlatList, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { IconButton, Text, TextInput } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RootParams } from "../_layout";
import { useNavigation } from "expo-router";
import { isSmartPhoneSize } from "../utils/isSmartPhoneSize";
import { RouteProp, useRoute } from "@react-navigation/native";
import CourseProvider, { useCourseContext } from "../providers/course";
import CourseCard from "../utils/course-card";

type NavigationProps = NativeStackNavigationProp<RootParams>;
type RouteProps = RouteProp<RootParams, "SearchPage">;
type HeadSectionProps = {
    navigation: NavigationProps;
}

export default function SearchPage() {
    const navigation = useNavigation<NavigationProps>();

    return (
        <CourseProvider>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container} >
                <ScrollView>
                    <HeadSection navigation={navigation} />
                    <BodySection />
                </ScrollView>
            </KeyboardAvoidingView >
        </CourseProvider>
    );
};

function HeadSection(props: HeadSectionProps) {
    return (
        <View style={styles.head}>
            <IconButton
                icon="keyboard-backspace" size={hp(4)}
                onPress={() => props.navigation.goBack()} />
            <Image style={styles.logo} source={require("@/assets/images/img_logo.png")} />
            <View style={{ width: wp(6) }} />
        </View>
    );
};

function BodySection() {
    const route = useRoute<RouteProps>();
    const { courseList } = useCourseContext();
    const [searchText, setSearchText] = useState<string>("");
    const filteredCourseList = courseList.filter((course) => course._name.toLowerCase().includes(searchText.toLowerCase()));

    useEffect(() => {
        setSearchText(route.params.searchText!);
    }, []);

    return (
        <View style={styles.body}>
            {/*Course search bar */}
            <TextInput
                mode="outlined" outlineStyle={{ borderWidth: 2, borderRadius: 15, borderColor: "green" }}
                label="Search courses" placeholder="What do you need?"
                style={{ width: wp(50), height: hp(7) }} right={<TextInput.Icon icon="magnify" />}
                value={searchText} onChangeText={(newText) => setSearchText(newText)} />
            <View style={{ height: hp(10) }} />
            <View style={styles.underline}>
                <Text style={styles.header_text}>{`Result for "${searchText}"`}</Text>
            </View>
            <View style={{ height: 10 }} />
            <View style={styles.search_list_container}>
                <FlatList style={{ maxHeight: hp(70) }} data={filteredCourseList} keyExtractor={(course) => course._id.toString()}
                    renderItem={({ item }) => <CourseCard mode="list" course={item} />} />
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
    underline: {
        width: wp(100),
        borderBottomWidth: 3,
        borderColor: ThemeColor.Olive_Green
    },
    logo: {
        width: isSmartPhoneSize() ? wp(25) : wp(8),
        height: isSmartPhoneSize() ? hp(7) : hp(8)
    },
    header_text: {
        alignSelf: "flex-start",
        marginStart: wp(5),
        fontSize: hp(4),
        color: ThemeColor.Olive_Green
    },
    search_list_container: {
        padding: 10,
        alignItems: "center",
        width: wp(55),
        height: hp(70),
        borderWidth: 3,
        borderColor: ThemeColor.Olive_Green,
        borderRadius: 15,
        backgroundColor: ThemeColor.Yellow_Green
    },
});