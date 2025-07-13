import { NavigationIndependentTree } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainLayout from "./pages/main-layout";
import LogInPage from "./pages/log-in";
import SignUpPage from "./pages/sign-up";
import UserProvider from "./providers/user";
import { PaperProvider } from "react-native-paper"
import { useEffect } from "react";
import { accountMockData } from "@/models/account";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { courseMockData } from "@/models/course";
import { purchaseItemMockData } from "@/models/purchase-Item";
import { purchaseMockData } from "@/models/purchase";

// Page properties 
export type RootParams = {
  MainLayout: undefined;
  LogInPage: undefined;
  SignUpPage: undefined;
};

export default function RootLayout() {
  const Stack = createNativeStackNavigator<RootParams>();

  useEffect(() => {
    async function pushRecords() {
      let jsonData;

      //Push Course records to AsyncStorage
      try {
        jsonData = JSON.stringify(courseMockData);

        if (await AsyncStorage.getItem("courses") == null) {
          await AsyncStorage.setItem("courses", jsonData);
        }
      }
      catch (error) {
        console.log("Fail to push Course records to AsyncStorage");
      }

      //Push PurchaseItem records to AsyncStorage
      try {
        jsonData = JSON.stringify(purchaseItemMockData);

        if (await AsyncStorage.getItem("purchaseItems") == null) {
          await AsyncStorage.setItem("purchaseItems", jsonData);
        }
      }
      catch (error) {
        console.log("Fail to push PurchaseItem records to AsyncStorage");
      }

      //Push Purchase records to AsyncStorage
      try {
        jsonData = JSON.stringify(purchaseMockData());

        if (await AsyncStorage.getItem("purchases") == null) {
          await AsyncStorage.setItem("purchases", jsonData);
        }
      }
      catch (error) {
        console.log("Fail to push Purchase records to AsyncStorage");
      }

      //Push Account records to AsyncStorage
      try {
        jsonData = JSON.stringify(accountMockData());

        if (await AsyncStorage.getItem("accounts") == null) {
          await AsyncStorage.setItem("accounts", jsonData);
        }
      }
      catch (error) {
        console.log("Fail to push Account records to AsyncStorage");
      }
    };

    pushRecords();
  }, []);

  return (
    //Define stack navigator
    <PaperProvider>
      <UserProvider>
        <NavigationIndependentTree>
          <Stack.Navigator initialRouteName="MainLayout" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainLayout" component={MainLayout} />
            <Stack.Screen name="LogInPage" component={LogInPage} />
            <Stack.Screen name="SignUpPage" component={SignUpPage} />
          </Stack.Navigator>
        </NavigationIndependentTree>
      </UserProvider>
    </PaperProvider>
  );
};