import React from "react";
import { createDrawerNavigator, DrawerContentComponentProps, DrawerItemList } from "@react-navigation/drawer";
import HomePage from "./home";
import BookmarkPage from "./bookmark";
import { Account } from "@/models/account";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootParams } from "../_layout";
import { StyleSheet, View } from "react-native";
import { useUserContext } from "../providers/user";
import { Icon, IconButton, Text } from "react-native-paper";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { ThemeColor } from "@/assets/colors/theme-colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavigationProps = NativeStackNavigationProp<RootParams>;
type RouteProps = RouteProp<RootParams, "MainLayout">;
//Drawer properties
export type MainLayoutParams = {
    HomePage: { account: Account | null };
    BookmarkPage: { account: Account | null };
}

export default function MainLayout() {
    const route = useRoute<RouteProps>();
    const Drawer = createDrawerNavigator<MainLayoutParams>();

    return (
        //Define drawer navigator
        <Drawer.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            drawerIcon: () => {
                let iconSource;
                switch (route.name) {
                    case "HomePage": {
                        iconSource = "home";
                        break;
                    }
                    case "BookmarkPage": {
                        iconSource = "bookmark";
                        break;
                    }
                    default: {
                        return;
                    }
                }
                return <Icon source={iconSource} size={hp(4)} />
            }
        })} drawerContent={(props) => <DrawerContent {...props} />}>
            <Drawer.Screen name="HomePage" component={HomePage} options={{ drawerLabel: "Home" }} initialParams={{ account: route.params.account }} />
            <Drawer.Screen name="BookmarkPage" component={BookmarkPage} options={{ drawerLabel: "Bookmark" }} initialParams={{ account: route.params.account }} />
        </Drawer.Navigator>
    );
};

function DrawerContent(props: DrawerContentComponentProps) {
    const navigation = useNavigation<NavigationProps>();
    const route = useRoute<RouteProps>();
    const { isLogged, setLoggedState } = useUserContext();

    return (
        <View style={styles.container} >
            <View style={styles.head_drawer}>
                <Text style={styles.text}>{`Welcome, ${isLogged ? route.params.account?._accountName : "Guest"}`}</Text>
            </View>
            <View style={{ height: 10 }} />
            <View style={styles.body_drawer}>
                <DrawerItemList {...props} />
            </View>
            {isLogged ?
                <View style={styles.bottom_drawer}>
                    <View>
                        <Text style={[styles.text, { fontSize: hp(2), fontWeight: "bold" }]}>HISTORY</Text>
                        <IconButton mode="contained-tonal" icon="history" size={hp(3)}
                            onPress={() => null} />
                    </View>
                    <View style={{ height: 30 }} />
                    <View>
                        <Text style={[styles.text, { fontSize: hp(2), fontWeight: "bold" }]}>LOG OUT</Text>
                        <IconButton mode="contained-tonal" icon="logout" size={hp(3)}
                            onPress={() => {
                                setLoggedState(false);
                                navigation.navigate("MainLayout", { account: null });
                            }} />
                    </View>
                </View>
                : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        backgroundColor: "white"
    },
    head_drawer: {
        padding: 10,
        height: hp(6),
        alignItems: "center",
        borderBottomWidth: 3,
        borderColor: ThemeColor.Olive_Green,
        backgroundColor: ThemeColor.Yellow_Green
    },
    body_drawer: {
        height: hp(60)
    },
    bottom_drawer: {
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: hp(34)
    },
    text: {
        fontSize: hp(3),
        color: ThemeColor.Olive_Green
    }
});