import React, { useState } from "react";
import { Course } from "@/models/course";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { IconButton, Text } from "react-native-paper";
import { ThemeColor } from "@/assets/colors/theme-colors";
import { isSmartPhoneSize } from "./isSmartPhoneSize";
import CourseModal from "./course-modal";
import { Account } from "@/models/account";

type CourseCardProps = {
    mode: "display" | "search" | "list";
    account: Account | null;
    course: Course;
}

export default function CourseCard(props: CourseCardProps) {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    
    return (
        <View >
            <CourseModal account={props.account} course={props.course} visible={modalVisible} setVisible={setModalVisible} />
            {props.mode == "display" || isSmartPhoneSize() ?
                <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => setModalVisible(true)}>
                    <Image source={props.course._image} style={styles.image_display} />
                </TouchableOpacity>
                : <TouchableOpacity style={styles.container} onPress={() => setModalVisible(true)}>
                    <Image source={props.course._image} style={styles.image_list} />
                    <View style={{ width: 10 }} />
                    <View style={styles.sub_container}>
                        <Text style={{ fontSize: hp(3) }}>{props.course._name}</Text>
                        <Text>{`${props.course._price}$`}</Text>
                        <Text>{props.course._shortDescription}</Text>
                    </View>
                    {props.mode == "search" ?
                        null
                        : <IconButton icon="menu" size={hp(3)} style={styles.icon_button} />}
                </TouchableOpacity>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginVertical: 10,
        padding: 10,
        width: wp(50),
        borderWidth: 3,
        borderColor: ThemeColor.Olive_Green,
        borderRadius: 10,
        backgroundColor: "white",
    },
    sub_container: {
        width: wp(40)
    },
    image_list: {
        width: hp(10),
        height: hp(10)
    },
    image_display: {
        width: wp(18),
        height: hp(18)
    },
    icon_button: {
        alignSelf: "center"
    },
    toast: {
        position:"absolute",
    }
});