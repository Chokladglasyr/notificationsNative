import {
    DarkTheme,
    DefaultTheme,
    NavigationContainer,
} from "@react-navigation/native";

import { registerRootComponent } from "expo";

import * as Notifications from "expo-notifications";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthStack from "./navigation/AuthStack";
import MainStack from "./navigation/MainStack";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});


export default function App() {
  const colorScheme = useColorScheme();
  const isLoggedIn = true;

  return (
    <SafeAreaProvider>
      <NavigationContainer
        theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      >
        {isLoggedIn && <MainStack />}
        {!isLoggedIn && <AuthStack />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
registerRootComponent(App);
