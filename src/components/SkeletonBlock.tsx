import React, { useEffect, useRef } from 'react';
import { Animated, StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { colors } from '../theme/colors';

type SkeletonBlockProps = {
  style?: StyleProp<ViewStyle>;
};

const SkeletonBlock: React.FC<SkeletonBlockProps> = ({ style }) => {
  const pulse = useRef(new Animated.Value(0.45)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 0.9,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0.45,
          duration: 750,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();
    return () => animation.stop();
  }, [pulse]);

  return <Animated.View style={[styles.block, style, { opacity: pulse }]} />;
};

const styles = StyleSheet.create({
  block: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
  },
});

export default SkeletonBlock;
