import { Dimensions } from "react-native";

export function isSmartPhoneSize() {
    const deviceWidth = Dimensions.get("window").width;

    return (deviceWidth >= 320 && deviceWidth <= 768);
};