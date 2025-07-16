import { NavigationIndependentTree } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainLayout from "./pages/main-layout";
import LogInPage from "./pages/log-in";
import SignUpPage from "./pages/sign-up";
import UserProvider from "./providers/user";
import { PaperProvider } from "react-native-paper"
import { useEffect } from "react";
import { Account, accountMockData } from "@/models/account";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { courseMockData } from "@/models/course";
import { purchaseMockData } from "@/models/purchase";
import SearchPage from "./pages/search";
import AccountProvider from "./providers/account";
import CourseProvider from "./providers/course";
import PurchaseProvider from "./providers/purchase";
import PurchaseItemProvider from "./providers/purchase-item";
import { purchaseItemMockData } from "@/models/purchase-Item";

// Page properties 
export type RootParams = {
  MainLayout: { account: Account | null };
  SearchPage: {
    account: Account | null;
    searchText: string;
  };
  LogInPage: {};
  SignUpPage: {};
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
      catch {
        console.log("Fail to push Course records to AsyncStorage");
      }

      //Push PurchaseItem records to AsyncStorage
      try {
        jsonData = JSON.stringify(purchaseItemMockData);

        if (await AsyncStorage.getItem("purchaseItems") == null) {
          await AsyncStorage.setItem("purchaseItems", jsonData);
        }
      }
      catch {
        console.log("Fail to push PurchaseItem records to AsyncStorage")
      }

      //Push Purchase records to AsyncStorage
      try {
        jsonData = JSON.stringify(purchaseMockData());

        if (await AsyncStorage.getItem("purchases") == null) {
          await AsyncStorage.setItem("purchases", jsonData);
        }
      }
      catch {
        console.log("Fail to push Purchase records to AsyncStorage");
      }

      //Push Account records to AsyncStorage
      try {
        jsonData = JSON.stringify(accountMockData());

        if (await AsyncStorage.getItem("accounts") == null) {
          await AsyncStorage.setItem("accounts", jsonData);
        }
      }
      catch {
        console.log("Fail to push Account records to AsyncStorage");
      }
    };

    pushRecords();
  }, []);

  return (
    //Define stack navigator
    <PaperProvider>
      <UserProvider>
        <AccountProvider>
          <CourseProvider>
            <PurchaseProvider>
              <PurchaseItemProvider>
                <NavigationIndependentTree>
                  <Stack.Navigator initialRouteName="MainLayout" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="MainLayout" component={MainLayout} initialParams={{ account: null }} />
                    <Stack.Screen name="SearchPage" component={SearchPage} />
                    <Stack.Screen name="LogInPage" component={LogInPage} />
                    <Stack.Screen name="SignUpPage" component={SignUpPage} />
                  </Stack.Navigator>
                </NavigationIndependentTree>
              </PurchaseItemProvider>
            </PurchaseProvider>
          </CourseProvider>
        </AccountProvider>
      </UserProvider>
    </PaperProvider>
  );
};