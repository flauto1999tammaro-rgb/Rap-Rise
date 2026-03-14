import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Linking,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { WebView } from 'react-native-webview';

import { colors } from '../theme/colors';
import { GeocodeResult, reverseGeocode, searchPlaces } from '../services/geocodingService';
import { getCurrentPosition } from '../services/locationService';
import { getNearbyStops } from '../services/transitService';
import RevealView from '../components/RevealView';

const buildMapHtml = (center: GeocodeResult | null, stops: Array<{ stop: any }>) => {
  const markers = stops.map((item) => ({
    name: item.stop.name,
    lat: item.stop.lat,
    lon: item.stop.lon,
  }));

  const markerJson = JSON.stringify(markers);
  const centerLat = center?.lat ?? 40.8518;
  const centerLon = center?.lon ?? 14.2681;

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <style>
      html, body, #map { height: 100%; margin: 0; }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script>
      const map = L.map('map').setView([${centerLat}, ${centerLon}], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);
      const markers = ${markerJson};
      markers.forEach((marker) => {
        if (marker.lat && marker.lon) {
          L.marker([marker.lat, marker.lon]).addTo(map).bindPopup(marker.name);
        }
      });
    </script>
  </body>
</html>`;
};

const MapFrame: React.FC<{ html: string }> = ({ html }) => {
  if (Platform.OS === 'web') {
    return (
      <iframe
        title="Napoli map"
        srcDoc={html}
        style={{ border: 0, width: '100%', height: '100%' }}
      />
    );
  }

  return <WebView originWhitelist={['*']} source={{ html }} />;
};

const MapScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 980;
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GeocodeResult[]>([]);
  const [center, setCenter] = useState<GeocodeResult | null>(null);
  const [stops, setStops] = useState<Array<{ stop: any; distance: number }>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const items = await searchPlaces(query);
      setResults(items);
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const loadStops = async () => {
      if (!center) {
        return;
      }
      setLoading(true);
      const nearby = await getNearbyStops(center.lat, center.lon);
      setStops(nearby);
      setLoading(false);
    };

    loadStops();
  }, [center]);

  const handleUseLocation = async () => {
    setError('');
    try {
      const position = await getCurrentPosition();
      const label = await reverseGeocode(position.lat, position.lon);
      setCenter({ id: 'me', label, lat: position.lat, lon: position.lon });
      setQuery(label);
      setResults([]);
    } catch {
      setError('Permesso posizione negato o GPS non disponibile.');
    }
  };

  const mapHtml = useMemo(() => buildMapHtml(center, stops), [center, stops]);
  const mapLink = center
    ? `https://www.openstreetmap.org/#map=15/${center.lat}/${center.lon}`
    : 'https://www.openstreetmap.org/#map=13/40.8518/14.2681';

  return (
    <View style={styles.container}>
      <View style={[styles.contentWrap, isDesktop ? styles.contentWrapDesktop : null]}>
      <RevealView delay={20}>
        <Text style={styles.title}>Mappa fermate</Text>
        <Text style={styles.subtitle}>Trova le fermate vicine e apri la mappa.</Text>
      </RevealView>

      <RevealView delay={70}>
        <TextInput
          value={query}
          onChangeText={(text) => {
            setQuery(text);
          }}
          placeholder="Cerca quartiere o indirizzo"
          placeholderTextColor={colors.textMuted}
          style={styles.input}
        />
      </RevealView>

      <RevealView delay={110}>
        <Pressable style={styles.secondaryButton} onPress={handleUseLocation}>
          <Text style={styles.secondaryText}>Usa la mia posizione</Text>
        </Pressable>

        {Platform.OS === 'web' ? (
          <Pressable style={styles.secondaryButton} onPress={() => Linking.openURL(mapLink)}>
            <Text style={styles.secondaryText}>Apri mappa in nuova scheda</Text>
          </Pressable>
        ) : null}
      </RevealView>

      {results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              style={styles.resultRow}
              onPress={() => {
                setCenter(item);
                setQuery(item.label);
                setResults([]);
              }}
            >
              <Text style={styles.resultText}>{item.label}</Text>
            </Pressable>
          )}
        />
      ) : null}

      {loading ? <ActivityIndicator color={colors.primary} /> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <RevealView delay={150}>
        <View style={styles.mapContainer}>
          <MapFrame html={mapHtml} />
        </View>
      </RevealView>

      <RevealView delay={190} style={styles.listWrap}>
        <FlatList
          data={stops}
          keyExtractor={(item) => item.stop.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.stopRow}>
              <Text style={styles.stopName}>{item.stop.name}</Text>
              <Text style={styles.stopMeta}>{`${Math.round(item.distance)} m`}</Text>
            </View>
          )}
        />
      </RevealView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  contentWrap: {
    width: '100%',
    gap: 12,
  },
  contentWrapDesktop: {
    maxWidth: 980,
    alignSelf: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textMuted,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryButton: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
  },
  secondaryText: {
    color: colors.primary,
    fontSize: 13,
  },
  resultRow: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  resultText: {
    color: colors.textPrimary,
    fontSize: 13,
  },
  error: {
    color: colors.danger,
  },
  mapContainer: {
    height: 240,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  listWrap: {
    minHeight: 120,
  },
  list: {
    gap: 10,
    paddingBottom: 24,
  },
  stopRow: {
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stopName: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  stopMeta: {
    fontSize: 12,
    color: colors.textMuted,
  },
});

export default MapScreen;
