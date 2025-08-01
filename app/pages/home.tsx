import React, { useState } from "react";
import { DrawerActions, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { FlatList, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { Button, IconButton, Snackbar, Text, TextInput } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useUserContext } from "../providers/user";
import { ThemeColor } from "@/assets/colors/theme-colors";
import { RootParams } from "../_layout";
import { isSmartPhoneSize } from "../utils/isSmartPhoneSize";
import { useCourseContext } from "../providers/course";
import CourseCard from "../utils/course-card";
import { MainLayoutParams } from "./main-layout";
import CartModal from "../utils/cart-modal";
import { Course } from "@/models/course";

type NavigationProps = NativeStackNavigationProp<RootParams>;
type RouteProps = RouteProp<MainLayoutParams, "HomePage">;
type HeadSectionProps = {
    navigation: NavigationProps;
    route: RouteProps;
};
type BodySectionProps = {
    navigation: NavigationProps;
    route: RouteProps;
};

export default function HomePage() {
    const navigation = useNavigation<NavigationProps>();
    const route = useRoute<RouteProps>();

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container} >
            <ScrollView>
                <HeadSection navigation={navigation} route={route} />
                <BodySection navigation={navigation} route={route} />
            </ScrollView>
        </KeyboardAvoidingView >
    );
}

function HeadSection(props: HeadSectionProps) {
    const { isLogged } = useUserContext();
    const [cartModalVisible, setCartModalVisible] = useState<boolean>(false);

    return (
        <View style={styles.head}>
            <IconButton
                icon="menu" size={hp(4)}
                onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer)} />
            <Image style={styles.logo} source={require("@/assets/images/img_logo.png")} />
            {isLogged ?
                <View>
                    <IconButton icon="cart-variant" size={hp(5)}
                        onPress={() => setCartModalVisible(true)} />
                    <CartModal account={props.route.params.account} visible={cartModalVisible} setVisible={setCartModalVisible} />
                </View>
                :
                <View style={styles.sub_head}>
                    <Button mode="contained-tonal" style={styles.button} labelStyle={{ fontSize: isSmartPhoneSize() ? hp(1.5) : hp(1.7), color: "white" }}
                        children="LOG IN" onPress={() => props.navigation.navigate("LogInPage", {})} />
                </View>
            }
        </View>
    );
};

function BodySection(props: BodySectionProps) {
    const { courseList } = useCourseContext();
    const [searchText, setSearchText] = useState<string>("");
    const [onRecommend, setOnRecommend] = useState<boolean>(false);
    const filteredCourseList = courseList.filter((course) => course._name.toLowerCase().includes(searchText.toLowerCase()));
    const topSaleCourseList = courseList.sort((a, b) => b._sale - a._sale).slice(0, 5);

    return (
        <View style={styles.body}>
            {/*Course search bar */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TextInput
                    mode="outlined" outlineStyle={{ borderWidth: 2, borderRadius: 15, borderColor: "green" }}
                    label="Search courses" placeholder="What do you need?"
                    style={{ width: wp(50), height: hp(7) }} right={<TextInput.Icon icon="magnify" onPress={() => props.navigation.navigate("SearchPage", { account: props.route.params.account, searchText: searchText })} />}
                    value={searchText} onChangeText={(newText) => {
                        setOnRecommend(false);
                        setSearchText(newText);
                    }}
                    onKeyPress={(event) => event.nativeEvent.key === "Enter" ? props.navigation.navigate("SearchPage", { account: props.route.params.account, searchText: searchText }) : null}
                    onSubmitEditing={() => props.navigation.navigate("SearchPage", { account: props.route.params.account, searchText: searchText })} />
                <View style={{ width: wp(5) }} />
                <Button mode="outlined" style={styles.button} labelStyle={{ fontSize: isSmartPhoneSize() ? hp(1.5) : hp(1.7), color: "white" }}
                    onPress={() => setOnRecommend(!onRecommend)}>RECOMMEND</Button>
            </View>
            {onRecommend ?
                props.route.params.account?._favouriteList?.length ?
                    <FlatList style={[styles.type_ahead_list_container, { maxHeight: hp(80) }]} contentContainerStyle={{ alignItems: "center" }}
                        data={getRecommendCourses(props.route.params.account?._favouriteList!, courseList)} keyExtractor={(course) => course._id.toString()}
                        renderItem={({ item }) => <CourseCard mode="search" account={props.route.params.account!} course={item} />} />
                    : <Text style={styles.normal_text}>Cannot recommend right now</Text>
                : searchText.length > 0 ?
                    <FlatList style={[styles.type_ahead_list_container, { maxHeight: hp(80) }]} contentContainerStyle={{ alignItems: "center" }}
                        data={filteredCourseList} keyExtractor={(course) => course._id.toString()}
                        renderItem={({ item }) => <CourseCard mode="search" account={props.route.params.account!} course={item} />} />
                    : null}
            {/*Type ahead course list */}
            <View style={{ height: hp(10) }} />
            <View style={styles.underline}>
                <Text style={styles.header_text}>TOP SALE</Text>
            </View>
            {/*Top 5 sale course list */}
            <View style={styles.top_sale_container}>
                {topSaleCourseList.map((course) => <CourseCard mode="display" account={props.route.params.account} course={course} />)}
            </View>
        </View>
    );
};

function getRecommendCourses(bookmarkList: Course[], courseList: Course[]): Course[] {
    if (bookmarkList.length === 0) return [];

    const tagSet = new Set<string>();
    bookmarkList.forEach(course => course._type.forEach(tag => tagSet.add(tag)));

    return courseList.filter(course => {
        const isBookmarked = bookmarkList.some(item => item._id === course._id);
        const hasSimilarTag = course._type.some(tag => tagSet.has(tag));
        return hasSimilarTag && !isBookmarked;
    });
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        marginTop: isSmartPhoneSize() ? hp(5) : null,
        backgroundColor: "white"
    },
    type_ahead_list_container: {
        position: "absolute",
        top: hp(9.2),
        left: wp(18.5),
        zIndex: 999,
        width: wp(51),
        borderRadius: 10,
        backgroundColor: ThemeColor.Yellow_Green
    },
    top_sale_container: {
        flexDirection: "row",
        justifyContent: "space-around",
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
        height: isSmartPhoneSize() ? hp(6) : hp(5),
        borderWidth: 3,
        borderColor: ThemeColor.Olive_Green,
        borderRadius: 15,
        backgroundColor: ThemeColor.Lime_Green
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
    },
    normal_text: {
        position: "absolute",
        top: hp(10),
        alignItems: "center",
        fontSize: isSmartPhoneSize() ? hp(3) : hp(4),
        color: ThemeColor.Lime_Green
    }
});