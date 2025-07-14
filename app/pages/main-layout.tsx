import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomePage from "./home";
import BookmarkPage from "./bookmark";

//Drawer properties
type MainLayoutProps = {
    HomePage: undefined;
    BookmarkPage: undefined;
}

export default function MainLayout() {
    const Drawer = createDrawerNavigator<MainLayoutProps>();

    return (
        //Define drawer navigator
        <Drawer.Navigator screenOptions={{ headerShown: false }}>
            <Drawer.Screen name="HomePage" component={HomePage} options={{ drawerLabel: "Home" }} />
            <Drawer.Screen name="BookmarkPage" component={BookmarkPage} options={{ drawerLabel: "Bookmark" }} />
        </Drawer.Navigator>
    );
};