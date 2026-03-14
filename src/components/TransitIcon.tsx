import React from 'react';
import Svg, { Circle, Line, Path, Polyline, Rect } from 'react-native-svg';

export type TransitIconName =
  | 'home'
  | 'search'
  | 'route'
  | 'map'
  | 'alerts'
  | 'favorites'
  | 'settings'
  | 'bus'
  | 'metro'
  | 'funicolare'
  | 'tram'
  | 'cumana';

type TransitIconProps = {
  name: TransitIconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  filled?: boolean;
};

const TransitIcon: React.FC<TransitIconProps> = ({
  name,
  size = 22,
  color = '#0F2027',
  strokeWidth = 1.9,
  filled = false,
}) => {
  const common = {
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none' as const,
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'home' ? (
        <>
          <Path {...common} d="M3 11.2L12 4l9 7.2" />
          <Path {...common} d="M6 10.8V20h12v-9.2" />
          <Rect {...common} x="10" y="13" width="4" height="7" />
        </>
      ) : null}

      {name === 'search' ? (
        <>
          <Circle {...common} cx="11" cy="11" r="6" />
          <Line {...common} x1="15.6" y1="15.6" x2="20" y2="20" />
        </>
      ) : null}

      {name === 'route' ? (
        <>
          <Circle cx="5" cy="7" r="2" fill={color} />
          <Circle cx="19" cy="17" r="2" fill={color} />
          <Path {...common} d="M7 7h3c2.4 0 2.1 3 4.3 3H17" />
          <Polyline {...common} points="14,8 17,10 14,12" />
          <Path {...common} d="M7 17h3c2.5 0 2.2-3 4.6-3H17" />
        </>
      ) : null}

      {name === 'map' ? (
        <>
          <Polyline {...common} points="3,7 9,4 15,7 21,4" />
          <Polyline {...common} points="3,17 9,20 15,17 21,20" />
          <Line {...common} x1="3" y1="7" x2="3" y2="17" />
          <Line {...common} x1="9" y1="4" x2="9" y2="20" />
          <Line {...common} x1="15" y1="7" x2="15" y2="17" />
          <Line {...common} x1="21" y1="4" x2="21" y2="20" />
        </>
      ) : null}

      {name === 'alerts' ? (
        <>
          <Path {...common} d="M7.5 9.2a4.5 4.5 0 019 0v4.4l1.7 2.1H5.8l1.7-2.1z" />
          <Path {...common} d="M10 17.5a2 2 0 004 0" />
          <Circle cx="12" cy="4.2" r="1" fill={color} />
        </>
      ) : null}

      {name === 'favorites' ? (
        <Path
          d="M12 18.8l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 5l2.7 5.4 6.1.9-4.4 4.3 1 6.1z"
          fill={filled ? color : 'none'}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : null}

      {name === 'settings' ? (
        <>
          <Circle {...common} cx="12" cy="12" r="2.9" />
          <Path {...common} d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2" />
          <Path {...common} d="M5.9 5.9l1.6 1.6M16.5 16.5l1.6 1.6M18.1 5.9l-1.6 1.6M7.5 16.5l-1.6 1.6" />
        </>
      ) : null}

      {name === 'bus' ? (
        <>
          <Rect {...common} x="5" y="5" width="14" height="11" rx="2.5" />
          <Rect {...common} x="7" y="7.5" width="10" height="4" rx="0.8" />
          <Circle cx="8" cy="18.2" r="1.7" fill={color} />
          <Circle cx="16" cy="18.2" r="1.7" fill={color} />
        </>
      ) : null}

      {name === 'metro' ? (
        <>
          <Rect {...common} x="6" y="4.8" width="12" height="12.5" rx="3" />
          <Circle cx="9" cy="10" r="1" fill={color} />
          <Circle cx="15" cy="10" r="1" fill={color} />
          <Line {...common} x1="9" y1="17.2" x2="7" y2="20" />
          <Line {...common} x1="15" y1="17.2" x2="17" y2="20" />
        </>
      ) : null}

      {name === 'funicolare' ? (
        <>
          <Line {...common} x1="4" y1="6" x2="20" y2="6" />
          <Path {...common} d="M7 9.5h10l-1.2 6H8.2z" />
          <Line {...common} x1="7" y1="9.5" x2="10" y2="6" />
          <Line {...common} x1="17" y1="9.5" x2="14" y2="6" />
          <Circle cx="10" cy="13" r="0.9" fill={color} />
          <Circle cx="14" cy="13" r="0.9" fill={color} />
        </>
      ) : null}

      {name === 'tram' ? (
        <>
          <Rect {...common} x="6" y="6" width="12" height="9.5" rx="2" />
          <Path {...common} d="M9 4.2h6" />
          <Path {...common} d="M10.3 4.2l1.7 1.8 1.7-1.8" />
          <Circle cx="9" cy="17.8" r="1.6" fill={color} />
          <Circle cx="15" cy="17.8" r="1.6" fill={color} />
        </>
      ) : null}

      {name === 'cumana' ? (
        <>
          <Path {...common} d="M6 15.8V7.6A2.6 2.6 0 018.6 5h6.8A2.6 2.6 0 0118 7.6v8.2" />
          <Rect {...common} x="8.2" y="7.2" width="7.6" height="4.2" rx="1" />
          <Circle cx="9.2" cy="17.8" r="1.5" fill={color} />
          <Circle cx="14.8" cy="17.8" r="1.5" fill={color} />
        </>
      ) : null}
    </Svg>
  );
};

export default TransitIcon;
