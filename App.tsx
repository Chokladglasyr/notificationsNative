import {
    DarkTheme,
    DefaultTheme,
    NavigationContainer,
} from "@react-navigation/native";

import { registerRootComponent } from "expo";

import * as Notifications from "expo-notifications";
import { useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthStack from "./navigation/AuthStack";
import MainStack from "./navigation/MainStack";
import { registerForPushNotificationsAsync } from "./utils/notifications";

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
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
    useMemo
  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => {console.log("min notis-token: ", token);setExpoPushToken(token ?? "")})
      .catch((error: any) => setExpoPushToken(`${error}`));

    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("notis recieved", notification)
        setNotification(notification);
      }
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

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
