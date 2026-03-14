import { NavigatorScreenParams } from '@react-navigation/native';

import { TransitMode } from '../types/transit';

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Route: undefined;
  Map: undefined;
  Alerts: undefined;
  Favorites: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList> | undefined;
  Mode: { mode: TransitMode };
  StopDetails: { stopId: string };
};
