import React, { } from "react";
import { IconButton, List, Modal, Portal, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { ThemeColor } from "@/assets/colors/theme-colors";
import { Account } from "@/models/account";
import { isSmartPhoneSize } from "./isSmartPhoneSize";

type CartModalProps = {
    account: Account | null;
    visible: boolean;
    setVisible: (state: boolean) => void;
};

export default function CartModal(props: CartModalProps) {

    return (
        <Portal>
            <Modal visible={props.visible} onDismiss={() => props.setVisible(false)}>
                <View style={styles.container_modal}>
                    <View style={styles.head_modal}>
                        <View style={{ width: wp(4) }} />
                        <Text style={styles.header_text}>YOUR CART</Text>
                        <IconButton icon="close" size={hp(4)}
                            onPress={() => props.setVisible(false)} />
                    </View>
                    <View>
                        <List.Accordion title="Pending">
                            {props.account?._purchaseList?.length! > 0 ?
                                <Text>There are purchases</Text> :
                                <Text style={styles.normal_text}>You have not add any course to your cart</Text>}
                        </List.Accordion>
                        <List.Accordion title="Completed">
                            {props.account?._purchaseList?.length! > 0 ?
                                <Text>There are purchases</Text> :
                                <Text style={styles.normal_text}>You have not make any purchases</Text>}
                        </List.Accordion>
                    </View>
                </View>
            </Modal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    container_modal: {
        flexDirection: "column",
        alignSelf: "center",
        width: wp(80),
        height: hp(80),
        borderWidth: 3,
        borderColor: ThemeColor.Olive_Green,
        borderRadius: 15,
        backgroundColor: "white"
    },
    head_modal: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: wp(79.7),
        height: hp(8),
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        backgroundColor: ThemeColor.Yellow_Green
    },
    body_modal: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        height: hp(72)
    },
    sub_body_modal: {
        flexDirection: "column",
        padding: 10,
        width: wp(45),
        height: hp(65),
        borderWidth: 3,
        borderColor: ThemeColor.Olive_Green,
        borderRadius: 15
    },
    image: {
        width: wp(30),
        height: hp(50)
    },
    header_text: {
        alignSelf: "center",
        fontSize: hp(5),
        color: ThemeColor.Green
    },
    normal_text: {
        marginStart: wp(5),
        fontSize: hp(3),
    },
    accordion_list: {
        backgroundColor: ThemeColor.Olive_Green
    },
    toast: {
        alignSelf: "center",
        backgroundColor: ThemeColor.Lime_Green
    }
});