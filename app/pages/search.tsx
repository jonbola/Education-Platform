import { ThemeColor } from "@/assets/colors/theme-colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { FlatList, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { Button, Dialog, FAB, IconButton, Menu, Portal, Text, TextInput } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RootParams } from "../_layout";
import { useNavigation } from "expo-router";
import { isSmartPhoneSize } from "../utils/isSmartPhoneSize";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useCourseContext } from "../providers/course";
import CourseCard from "../utils/course-card";
import { Course } from "@/models/course";

type NavigationProps = NativeStackNavigationProp<RootParams>;
type RouteProps = RouteProp<RootParams, "SearchPage">;

export default function SearchPage() {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container} >
            <ScrollView>
                <HeadSection />
                <BodySection />
            </ScrollView>
        </KeyboardAvoidingView >
    );
};

function HeadSection() {
    const navigation = useNavigation<NavigationProps>();

    return (
        <View style={styles.head}>
            <IconButton
                icon="keyboard-backspace" size={hp(4)}
                onPress={() => navigation.goBack()} />
            <Image style={styles.logo} source={require("@/assets/images/img_logo.png")} />
            <View style={{ width: wp(6) }} />
        </View>
    );
};

function BodySection() {
    const route = useRoute<RouteProps>();
    const { courseList } = useCourseContext();
    const [searchText, setSearchText] = useState<string>("");
    const [filterCondition, setFilterCondition] = useState<string>("");
    const [filteredCourseList, setFilteredCourseList] = useState<Course[]>([]);

    useEffect(() => {
        setSearchText(route.params.searchText);
    }, []);

    useEffect(() => {
        const searchCourseList = courseList.filter((course) => course._name.toLowerCase().includes(searchText.toLowerCase()));
        let newList: Course[] = [];

        switch (filterCondition) {
            case "<10": {
                newList = searchCourseList.filter((course) => course._price < 10);
                break;
            }
            case "10-25": {
                newList = searchCourseList.filter((course) => course._price >= 10 && course._price <= 25);
                break;
            }
            case ">25": {
                newList = searchCourseList.filter((course) => course._price > 25);
                break;
            }
            default:
                newList = searchCourseList;
        }
        setFilteredCourseList(newList);
    }, [searchText, filterCondition, courseList]);

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
            {/*Filterd course list */}
            <FilterButton setFilterCondition={setFilterCondition} />
            {filteredCourseList.length > 0 ?
                <View style={styles.filtered_list_container}>
                    <FlatList contentContainerStyle={{ alignItems: "center" }}
                        data={filteredCourseList} keyExtractor={(course) => course._id.toString()}
                        renderItem={({ item }) => <CourseCard mode="list" account={route.params.account!} course={item} />} />
                </View>
                :
                <Text style={[styles.header_text, { alignSelf: "center" }]}>CANNOT FIND YOUR COURSES</Text>}
        </View>
    );
};

function FilterButton({ setFilterCondition }: { setFilterCondition: (condition: string) => void }) {
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <Portal>
            <Dialog visible={visible} style={styles.filter_button_container}
                onDismiss={() => setVisible(false)} >
                <Dialog.Title>Filter by Price</Dialog.Title>
                <Dialog.Content>
                    <Button labelStyle={styles.filter_button_label}
                        onPress={() => {
                            setFilterCondition("<10");
                            setVisible(false);
                        }}>{"<10$"}</Button>
                    <Button labelStyle={styles.filter_button_label}
                        onPress={() => {
                            setFilterCondition("10-25");
                            setVisible(false);
                        }}>{"10$ - 25$"}</Button>
                    <Button labelStyle={styles.filter_button_label}
                        onPress={() => {
                            setFilterCondition(">25");
                            setVisible(false);
                        }}>{">25$"}</Button>
                </Dialog.Content>
            </Dialog>
            <FAB icon="filter-outline" style={{ position: "absolute", top: hp(40), right: wp(15) }}
                onPress={() => setVisible(!visible)} />
        </Portal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        backgroundColor: "white"
    },
    filter_button_container: {
        position: "absolute",
        top: hp(40),
        right: wp(18),
        width: wp(15),
        height: hp(30)
    },
    filtered_list_container: {
        padding: 10,
        width: wp(55),
        maxHeight: hp(70),
        borderWidth: 3,
        borderColor: ThemeColor.Olive_Green,
        borderRadius: 15,
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
    filter_button_label: {
        fontSize: hp(2.5)
    }
});