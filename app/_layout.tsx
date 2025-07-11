import { NavigationIndependentTree } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainLayout from "./pages/main-layout";
import LogInPage from "./pages/log-in";
import SignUpPage from "./pages/sign-up";
import UserProvider from "./providers/user";
import { PaperProvider } from "react-native-paper"

// Page properties 
export type RootProps = {
  MainLayout: undefined;
  LogInPage: undefined;
  SignUpPage: undefined;
}

export default function RootLayout() {
  const Stack = createNativeStackNavigator<RootProps>();

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
}