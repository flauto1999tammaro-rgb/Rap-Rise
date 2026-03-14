import { Platform } from 'react-native';

const sans = Platform.select({
  ios: 'Avenir Next',
  android: 'sans-serif',
  web: 'Manrope, Nunito Sans, Segoe UI, Helvetica Neue, Arial, sans-serif',
  default: 'System',
});

export const typography = {
  fontFamily: sans,
  title: {
    fontSize: 24,
    fontWeight: '700' as const,
    letterSpacing: 0.2,
  },
  section: {
    fontSize: 17,
    fontWeight: '700' as const,
    letterSpacing: 0.2,
  },
  body: {
    fontSize: 14,
    fontWeight: '500' as const,
  },
  caption: {
    fontSize: 12,
    fontWeight: '600' as const,
    letterSpacing: 0.3,
  },
};
