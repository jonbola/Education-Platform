import React from "react";
import { Modal, Portal, Text } from "react-native-paper";
import { Course } from "@/models/course";
import { Image, StyleSheet, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { ThemeColor } from "@/assets/colors/theme-colors";

type CourseModalProps = {
    course: Course;
    visible: boolean;
    setVisible: (state: boolean) => void;
}
export default function CourseModal(props: CourseModalProps) {
    return (
        <Portal>
            <Modal visible={props.visible} onDismiss={() => props.setVisible(false)}>
                <View style={styles.container}>
                    <Image style={styles.image} source={props.course._image} />
                    <View style={{marginStart:wp(5)}}>
                        <Text style={styles.header_text}>{props.course._name}</Text>
                        <Text style={styles.normal_text}>{`Price: ${props.course._price}$`}</Text>
                        <Text style={[styles.normal_text,{width:wp(40)}]}>{ `Description: ${props.course._longDescription}`}</Text>
                    </View>
                </View>
            </Modal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection:"row",
        alignSelf: "center",
        padding: 10,
        width: wp(80),
        height: hp(80),
        borderWidth: 3,
        borderColor: ThemeColor.Olive_Green,
        borderRadius:15,
        backgroundColor: "white"
    },
    image: {
        alignSelf:"center",
        width: wp(30),
        height: hp(50)
    },
    header_text: {
        alignSelf: "center",
        fontSize: hp(5),
        color: ThemeColor.Olive_Green
    },
    normal_text: {
        fontSize: hp(4),
        color:ThemeColor.Lime_Green
    }
});