import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import RoutePlannerScreen from './src/screens/RoutePlannerScreen';
import MapScreen from './src/screens/MapScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import AlertsScreen from './src/screens/AlertsScreen';
import ModeScreen from './src/screens/ModeScreen';
import StopDetailsScreen from './src/screens/StopDetailsScreen';
import { FavoritesProvider } from './src/state/FavoritesContext';
import { colors } from './src/theme/colors';
import { RootStackParamList, TabParamList } from './src/navigation/types';
import { radius } from './src/theme/tokens';
import { typography } from './src/theme/typography';
import { getUnreadProactiveAlertsCount, subscribeToAlertChanges } from './src/services/alertsService';
import { subscribeToNotificationRouting } from './src/services/notificationsService';
import TransitIcon, { TransitIconName } from './src/components/TransitIcon';

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();
const navigationRef = createNavigationContainerRef<RootStackParamList>();

const TAB_ICONS: Record<keyof TabParamList, TransitIconName> = {
  Home: 'home',
  Search: 'search',
  Route: 'route',
  Map: 'map',
  Alerts: 'alerts',
  Favorites: 'favorites',
  Settings: 'settings',
};

const Tabs: React.FC<{ unreadAlerts: number }> = ({ unreadAlerts }) => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      animation: 'fade',
      headerStyle: { backgroundColor: colors.background },
      headerShadowVisible: false,
      headerTitleStyle: {
        color: colors.textPrimary,
        fontSize: 20,
        fontWeight: '700',
        letterSpacing: 0.2,
        fontFamily: typography.fontFamily,
      },
      tabBarStyle: styles.tabBar,
      tabBarLabelStyle: {
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 0.2,
        fontFamily: typography.fontFamily,
      },
      tabBarItemStyle: {
        paddingVertical: 3,
      },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textMuted,
      tabBarIcon: ({ color, size }) => {
        return <TransitIcon name={TAB_ICONS[route.name]} size={size + 1} color={color} strokeWidth={2} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Napoli' }} />
    <Tab.Screen name="Search" component={SearchScreen} options={{ title: 'Cerca' }} />
    <Tab.Screen name="Route" component={RoutePlannerScreen} options={{ title: 'Percorso' }} />
    <Tab.Screen name="Map" component={MapScreen} options={{ title: 'Mappa' }} />
    <Tab.Screen
      name="Alerts"
      component={AlertsScreen}
      options={{
        title: 'Avvisi',
        tabBarBadge: unreadAlerts > 0 ? unreadAlerts : undefined,
      }}
    />
    <Tab.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Preferiti' }} />
    <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Impostazioni' }} />
  </Tab.Navigator>
);

export default function App() {
  const [unreadAlerts, setUnreadAlerts] = useState(0);

  useEffect(() => {
    let active = true;

    const updateUnread = async () => {
      const count = await getUnreadProactiveAlertsCount();
      if (active) {
        setUnreadAlerts(count);
      }
    };

    updateUnread();
    const unsubscribe = subscribeToAlertChanges(() => {
      updateUnread();
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToNotificationRouting(() => {
      if (!navigationRef.isReady()) {
        return;
      }
      navigationRef.navigate('Tabs', { screen: 'Alerts' });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <FavoritesProvider>
        <NavigationContainer
          ref={navigationRef}
          theme={{
            dark: false,
            colors: {
              primary: colors.primary,
              background: colors.background,
              card: colors.background,
              text: colors.textPrimary,
              border: colors.border,
              notification: colors.secondary,
            },
            fonts: {
              regular: { fontFamily: typography.fontFamily, fontWeight: '400' },
              medium: { fontFamily: typography.fontFamily, fontWeight: '500' },
              bold: { fontFamily: typography.fontFamily, fontWeight: '700' },
              heavy: { fontFamily: typography.fontFamily, fontWeight: '800' },
            },
          }}
        >
          <StatusBar style="dark" />
          <Stack.Navigator
            screenOptions={{
              animation: 'fade',
              contentStyle: { backgroundColor: colors.background },
              headerStyle: { backgroundColor: colors.background },
              headerShadowVisible: false,
              headerTitleStyle: {
                color: colors.textPrimary,
                fontSize: 19,
                fontWeight: '700',
                fontFamily: typography.fontFamily,
              },
              headerTintColor: colors.textPrimary,
            }}
          >
            <Stack.Screen name="Tabs" options={{ headerShown: false }}>
              {() => <Tabs unreadAlerts={unreadAlerts} />}
            </Stack.Screen>
            <Stack.Screen name="Mode" component={ModeScreen} options={{ title: 'Modalita' }} />
            <Stack.Screen name="StopDetails" component={StopDetailsScreen} options={{ title: 'Fermata' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritesProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 14,
    right: 14,
    bottom: 12,
    height: 74,
    borderRadius: radius.xl,
    backgroundColor: '#FCFFFFF2',
    borderTopWidth: 0,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOpacity: 0.2,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
    paddingTop: 7,
    paddingBottom: 5,
  },
});
