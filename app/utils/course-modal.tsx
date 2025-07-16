import React, { useEffect, useState } from "react";
import { Button, IconButton, Modal, Portal, Snackbar, Text } from "react-native-paper";
import { Course } from "@/models/course";
import { Image, StyleSheet, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { ThemeColor } from "@/assets/colors/theme-colors";
import { Account } from "@/models/account";
import { useUserContext } from "../providers/user";
import { useAccountContext } from "../providers/account";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isSmartPhoneSize } from "./isSmartPhoneSize";
import { Purchase } from "@/models/purchase";
import { PurchaseItem } from "@/models/purchase-Item";
import { usePurchaseContext } from "../providers/purchase";
import { usePurchaseItemContext } from "../providers/purchase-item";

type CourseModalProps = {
    account: Account | null;
    course: Course;
    visible: boolean;
    setVisible: (state: boolean) => void;
};

export default function CourseModal(props: CourseModalProps) {
    const { isLogged } = useUserContext();
    const { accountList } = useAccountContext();
    const { purchaseList } = usePurchaseContext();
    const { purchaseItemList } = usePurchaseItemContext();
    const [bookmarkIcon, setBookmarkIcon] = useState<string>("bookmark-outline");
    const [purchaseButtonColor, setPurchaseButtonColor] = useState<string>(ThemeColor.Olive_Green);
    const [toastCartVisible, setToastCartVisible] = useState<boolean>(false);
    const [toastFavouriteVisible, setToastFavouriteVisible] = useState<boolean>(false);

    useEffect(() => {
        props.account?._favouriteList?.some((item) => item._id === props.course._id) ? setBookmarkIcon("bookmark") : setBookmarkIcon("bookmark-outline");
    }, [props.account, props.course]);

    return (
        <Portal>
            <Modal visible={props.visible} onDismiss={() => props.setVisible(false)}>
                <View style={styles.container_modal}>
                    <View style={styles.head_modal}>
                        {isLogged ?
                            <IconButton size={hp(5)} icon={bookmarkIcon}
                                onPress={() => {
                                    setToastFavouriteVisible(true);
                                    setBookmark(accountList, props.account!, props.course, bookmarkIcon, setBookmarkIcon);
                                }} />
                            :
                            <View style={{ height: hp(8) }} />}
                        <IconButton icon="close" size={hp(4)}
                            onPress={() => props.setVisible(false)} />
                    </View>
                    <View style={styles.body_modal}>
                        <Image style={styles.image} source={props.course._image} />
                        <View style={styles.sub_body_modal}>
                            <Text style={styles.header_text}>{props.course._name}</Text>
                            <View style={{ height: hp(10) }} />
                            <Text style={styles.normal_text}>{`Sold: ${props.course._sale} copies`}</Text>
                            <Text style={styles.normal_text}>{`Price: ${props.course._price}$`}</Text>
                            <Text style={styles.normal_text}>{`Description: ${props.course._longDescription}`}</Text>
                            <View style={{ height: hp(5) }} />
                            <View style={{ alignItems: "center" }}>
                                <Text style={styles.header_text}>PURCHASE</Text>
                                <View style={{ height: hp(3) }} />
                                {isLogged ?
                                    <View >
                                        <Button mode="contained-tonal" style={[styles.button, { backgroundColor: purchaseButtonColor }]} labelStyle={{ color: "white" }}
                                            onPointerEnter={() => setPurchaseButtonColor(ThemeColor.Green)} onPointerLeave={() => setPurchaseButtonColor(ThemeColor.Olive_Green)}
                                            onPress={() => {
                                                setToastCartVisible(true);
                                                addToCart(props.account!, props.course, purchaseList, purchaseItemList);
                                            }}>ADD TO CART</Button>
                                    </View>
                                    :
                                    <View>
                                        <Text style={[styles.normal_text, { alignSelf: "center" }]}>
                                            LOG IN TO PURCHASE THIS COURSE</Text>
                                    </View>}
                            </View>
                            <Snackbar visible={toastCartVisible} duration={2000} style={styles.cart_toast}
                                onDismiss={() => setToastCartVisible(false)}>Course has been added to your cart</Snackbar>
                            <Snackbar visible={toastFavouriteVisible} duration={2000} style={styles.favourite_toast}
                                onDismiss={() => setToastFavouriteVisible(false)}>{bookmarkIcon == "bookmark" ? "You like this course" : "You unlike this course"}</Snackbar>
                        </View>
                    </View>
                </View>
            </Modal>
        </Portal>
    );
};

async function setBookmark(accountList: Account[], account: Account,
    course: Course, bookmarkIcon: string, setBookmarkIcon: (icon: string) => void) {
    let updatedAccountList: Account[];

    if (account) {
        if (bookmarkIcon == "bookmark-outline") {
            setBookmarkIcon("bookmark");
            account._favouriteList?.push(course);
            updatedAccountList = accountList.map((item) => item._id === account._id ? account : item);
        }
        else {
            setBookmarkIcon("bookmark-outline");
            const filteredList = account._favouriteList?.filter((item) => item._id !== course._id);
            account._favouriteList = filteredList;
            updatedAccountList = accountList.map((item) => item._id === account._id ? account : item);
        }

        await AsyncStorage.setItem("accounts", JSON.stringify(updatedAccountList));
    }
};

async function addToCart(account: Account, course: Course, purchaseList: Purchase[], purchaseItemList: PurchaseItem[]) {
    const dateNow = new Date();
    const pad = (n: number) => n.toString().padStart(2, "0");
    const dateString = `${dateNow.getFullYear()}-${pad(dateNow.getMonth() + 1)}-${pad(dateNow.getDate())}T${pad(dateNow.getHours())}:${pad(dateNow.getMinutes())}:${pad(dateNow.getSeconds())}`;
    let currentPurchaseId: number;
    let currentPurchase = purchaseList.find((purchase) => purchase._accountId === account._id && purchase._state === "pending")

    if (currentPurchase) {
        currentPurchaseId = currentPurchase._id;
    }
    else {
        const newPurchaseId = purchaseList.reduce((acc, curr) => Math.max(acc, curr._id), 0) + 1;
        currentPurchase = new Purchase(newPurchaseId, 0, dateString, [], account._id, "pending");
        purchaseList.push(currentPurchase);
        currentPurchaseId = newPurchaseId;
    }

    const newPurchaseItemId = purchaseItemList.reduce((acc, curr) => Math.max(acc, curr._id), 0) + 1;
    const newPurchaseItem = new PurchaseItem(newPurchaseItemId, currentPurchaseId, course._id);
    purchaseItemList.push(newPurchaseItem);
    currentPurchase._itemList.push(newPurchaseItem);

    await AsyncStorage.setItem("purchaseItems", JSON.stringify(purchaseItemList));
    await AsyncStorage.setItem("purchases", JSON.stringify(purchaseList));
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
        fontSize: hp(4),
        color: ThemeColor.Lime_Green
    },
    button: {
        width: isSmartPhoneSize() ? wp(30) : wp(8),
        height: hp(6),
        borderWidth: 3,
        borderColor: ThemeColor.Lime_Green
    },
    cart_toast: {
        alignSelf: "center",
        backgroundColor: ThemeColor.Lime_Green
    },
    favourite_toast: {
        alignSelf: "center",
        backgroundColor: ThemeColor.Lime_Green
    }
});