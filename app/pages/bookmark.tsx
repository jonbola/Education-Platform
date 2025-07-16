import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "expo-router";
import { FlatList, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { IconButton } from "react-native-paper";
import { MainLayoutParams } from "./main-layout";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { ThemeColor } from "@/assets/colors/theme-colors";
import { isSmartPhoneSize } from "../utils/isSmartPhoneSize";
import { useUserContext } from "../providers/user";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Course } from "@/models/course";
import CourseCard from "../utils/course-card";


type NavigationProps = NativeStackNavigationProp<MainLayoutParams, "BookmarkPage">;
type RouteProps = RouteProp<MainLayoutParams, "BookmarkPage">;

export default function BookmarkPage() {
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
    const { isLogged } = useUserContext();
    
    return (
        <View style={styles.body}>
            {isLogged ?
                <View style={styles.sub_body}>
                    <View style={{ height: hp(5) }} />
                    <View style={styles.underline}>
                        <Text style={[styles.header_text, { marginStart: wp(5) }]}>YOUR FAVOURITE:</Text>
                    </View>
                    <View style={{ height: 10 }} />
                    <View style={styles.list_container}>
                        {route.params.account?._favouriteList?.some((account)=>account._id) ?
                            <View>
                                {/*Course list  */}
                                <FlatList style={{ maxHeight: hp(70) }} data={route.params.account?._favouriteList}
                                    keyExtractor={(course) => course._id.toString()}
                                    renderItem={({ item }) => <CourseCard mode="list" account={route.params.account!} course={item} />} />
                            </View>
                            :
                            <Text style={[styles.header_text, { alignSelf: "center" }]}>EXPLORE AROUND APP AND FIND YOUR FAVOURITES</Text>
                        }
                    </View>
                </View>
                :
                <Text style={[styles.header_text, { alignSelf: "center" }]}>LOG IN TO USE THIS PAGE</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        backgroundColor: "white"
    },
    list_container: {
        alignSelf:"center",
        width: wp(50),
        borderWidth: 3,
        borderColor: ThemeColor.Olive_Green,
        borderRadius:15,
        backgroundColor:ThemeColor.Yellow_Green
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
        justifyContent: "center",
        padding: 10,
        width: wp(100),
        height: hp(70),
    },
    sub_body: {
        width: wp(100),
        height:hp(70)
    },
    underline: {
        width: wp(99),
        borderBottomWidth: 3,
        borderColor: ThemeColor.Olive_Green
    },
    logo: {
        width: isSmartPhoneSize() ? wp(25) : wp(8),
        height: isSmartPhoneSize() ? hp(7) : hp(8)
    },
    header_text: {
        alignSelf: "flex-start",
        fontSize: hp(4),
        color: ThemeColor.Olive_Green
    },
    search_list_container: {
        padding: 10,
        alignItems: "center",
        width: wp(55),
        borderWidth: 3,
        borderColor: ThemeColor.Olive_Green,
        borderRadius: 15,
        backgroundColor: ThemeColor.Yellow_Green
    },
});