import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { colors } from '../theme/colors';
import {
  SavedPlace,
  defaultSettings,
  loadSettings,
  saveSettings,
} from '../services/settingsService';

const parseNumber = (value: string): number | null => {
  const normalized = value.trim().replace(',', '.');
  if (!normalized) {
    return null;
  }
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
};

const isTimeString = (value: string): boolean => {
  const match = value.trim().match(/^(\d{2}):(\d{2})$/);
  if (!match) {
    return false;
  }
  const hh = Number(match[1]);
  const mm = Number(match[2]);
  return hh >= 0 && hh <= 23 && mm >= 0 && mm <= 59;
};

const toFieldValue = (value: number | null | undefined) =>
  typeof value === 'number' && Number.isFinite(value) ? String(value) : '';

const buildSavedPlace = (label: string, lat: string, lon: string): SavedPlace | null => {
  const parsedLat = parseNumber(lat);
  const parsedLon = parseNumber(lon);
  const trimmedLabel = label.trim();
  if (!trimmedLabel || parsedLat === null || parsedLon === null) {
    return null;
  }
  return {
    label: trimmedLabel,
    lat: parsedLat,
    lon: parsedLon,
  };
};

const SettingsScreen: React.FC = () => {
  const [apiBaseUrl, setApiBaseUrl] = useState(defaultSettings.apiBaseUrl);
  const [apiKey, setApiKey] = useState('');
  const [backendBaseUrl, setBackendBaseUrl] = useState(defaultSettings.backendBaseUrl);
  const [homeLabel, setHomeLabel] = useState('Casa');
  const [homeLat, setHomeLat] = useState('');
  const [homeLon, setHomeLon] = useState('');
  const [workLabel, setWorkLabel] = useState('Lavoro');
  const [workLat, setWorkLat] = useState('');
  const [workLon, setWorkLon] = useState('');
  const [smartAlertsEnabled, setSmartAlertsEnabled] = useState(defaultSettings.smartAlertsEnabled);
  const [notificationPolicy, setNotificationPolicy] = useState(defaultSettings.notificationPolicy);
  const [quietHoursEnabled, setQuietHoursEnabled] = useState(defaultSettings.quietHoursEnabled);
  const [quietHoursStart, setQuietHoursStart] = useState(defaultSettings.quietHoursStart);
  const [quietHoursEnd, setQuietHoursEnd] = useState(defaultSettings.quietHoursEnd);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const load = async () => {
      const settings = await loadSettings();
      setApiBaseUrl(settings.apiBaseUrl);
      setApiKey(settings.apiKey);
      setBackendBaseUrl(settings.backendBaseUrl);
      setSmartAlertsEnabled(settings.smartAlertsEnabled);
      setNotificationPolicy(settings.notificationPolicy);
      setQuietHoursEnabled(settings.quietHoursEnabled);
      setQuietHoursStart(settings.quietHoursStart);
      setQuietHoursEnd(settings.quietHoursEnd);

      if (settings.homePlace) {
        setHomeLabel(settings.homePlace.label);
        setHomeLat(toFieldValue(settings.homePlace.lat));
        setHomeLon(toFieldValue(settings.homePlace.lon));
      }

      if (settings.workPlace) {
        setWorkLabel(settings.workPlace.label);
        setWorkLat(toFieldValue(settings.workPlace.lat));
        setWorkLon(toFieldValue(settings.workPlace.lon));
      }
    };

    load();
  }, []);

  const handleSave = async () => {
    const normalizedQuietStart = isTimeString(quietHoursStart) ? quietHoursStart : defaultSettings.quietHoursStart;
    const normalizedQuietEnd = isTimeString(quietHoursEnd) ? quietHoursEnd : defaultSettings.quietHoursEnd;
    const homePlace = buildSavedPlace(homeLabel, homeLat, homeLon);
    const workPlace = buildSavedPlace(workLabel, workLat, workLon);
    await saveSettings({
      apiBaseUrl,
      apiKey,
      backendBaseUrl,
      geocodingProvider: 'nominatim',
      homePlace,
      workPlace,
      smartAlertsEnabled,
      notificationPolicy,
      quietHoursEnabled,
      quietHoursStart: normalizedQuietStart,
      quietHoursEnd: normalizedQuietEnd,
    });
    setStatus('Configurazione salvata.');
    setTimeout(() => setStatus(''), 2000);
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Configurazione API ANM</Text>
      <Text style={styles.caption}>Inserisci base URL e API key quando disponibili.</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Base URL</Text>
        <TextInput
          value={apiBaseUrl}
          onChangeText={setApiBaseUrl}
          placeholder="https://api.anm.it"
          placeholderTextColor={colors.textMuted}
          style={styles.input}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>API Key</Text>
        <TextInput
          value={apiKey}
          onChangeText={setApiKey}
          placeholder="Inserisci la chiave"
          placeholderTextColor={colors.textMuted}
          style={styles.input}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Backend routing (PC)</Text>
        <TextInput
          value={backendBaseUrl}
          onChangeText={setBackendBaseUrl}
          placeholder="http://192.168.x.x:3001"
          placeholderTextColor={colors.textMuted}
          style={styles.input}
          autoCapitalize="none"
        />
        <Text style={styles.hint}>Usa l'IP del PC per calcolare percorsi e orari completi.</Text>
      </View>

      <View style={styles.block}>
        <Text style={styles.blockTitle}>Profilo pendolare</Text>
        <Text style={styles.hint}>Imposta coordinate casa/lavoro per percorsi rapidi da Route Planner.</Text>

        <View style={styles.field}>
          <Text style={styles.label}>Casa - Etichetta</Text>
          <TextInput
            value={homeLabel}
            onChangeText={setHomeLabel}
            placeholder="Casa"
            placeholderTextColor={colors.textMuted}
            style={styles.input}
          />
        </View>

        <View style={styles.inlineFields}>
          <View style={styles.inlineField}>
            <Text style={styles.label}>Casa lat</Text>
            <TextInput
              value={homeLat}
              onChangeText={setHomeLat}
              placeholder="40.8518"
              placeholderTextColor={colors.textMuted}
              style={styles.input}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inlineField}>
            <Text style={styles.label}>Casa lon</Text>
            <TextInput
              value={homeLon}
              onChangeText={setHomeLon}
              placeholder="14.2681"
              placeholderTextColor={colors.textMuted}
              style={styles.input}
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Lavoro - Etichetta</Text>
          <TextInput
            value={workLabel}
            onChangeText={setWorkLabel}
            placeholder="Lavoro"
            placeholderTextColor={colors.textMuted}
            style={styles.input}
          />
        </View>

        <View style={styles.inlineFields}>
          <View style={styles.inlineField}>
            <Text style={styles.label}>Lavoro lat</Text>
            <TextInput
              value={workLat}
              onChangeText={setWorkLat}
              placeholder="40.8403"
              placeholderTextColor={colors.textMuted}
              style={styles.input}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inlineField}>
            <Text style={styles.label}>Lavoro lon</Text>
            <TextInput
              value={workLon}
              onChangeText={setWorkLon}
              placeholder="14.2522"
              placeholderTextColor={colors.textMuted}
              style={styles.input}
              autoCapitalize="none"
            />
          </View>
        </View>

        <Pressable
          style={[styles.toggleButton, smartAlertsEnabled ? styles.toggleEnabled : null]}
          onPress={() => setSmartAlertsEnabled((prev) => !prev)}
        >
          <Text style={[styles.toggleText, smartAlertsEnabled ? styles.toggleTextEnabled : null]}>
            Alert intelligenti: {smartAlertsEnabled ? 'Attivi' : 'Disattivati'}
          </Text>
        </Pressable>
      </View>

      <View style={styles.block}>
        <Text style={styles.blockTitle}>Notifiche proattive</Text>
        <Text style={styles.hint}>Decidi quando ricevere notifiche locali dagli alert commute.</Text>

        <View style={styles.inlineFields}>
          <Pressable
            style={[
              styles.policyButton,
              notificationPolicy === 'off' ? styles.policyButtonActive : null,
            ]}
            onPress={() => setNotificationPolicy('off')}
          >
            <Text
              style={[
                styles.policyText,
                notificationPolicy === 'off' ? styles.policyTextActive : null,
              ]}
            >
              Off
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.policyButton,
              notificationPolicy === 'critical-only' ? styles.policyButtonActive : null,
            ]}
            onPress={() => setNotificationPolicy('critical-only')}
          >
            <Text
              style={[
                styles.policyText,
                notificationPolicy === 'critical-only' ? styles.policyTextActive : null,
              ]}
            >
              Solo critical
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.policyButton,
              notificationPolicy === 'critical-and-warn' ? styles.policyButtonActive : null,
            ]}
            onPress={() => setNotificationPolicy('critical-and-warn')}
          >
            <Text
              style={[
                styles.policyText,
                notificationPolicy === 'critical-and-warn' ? styles.policyTextActive : null,
              ]}
            >
              Critical + warn
            </Text>
          </Pressable>
        </View>

        <Pressable
          style={[styles.toggleButton, quietHoursEnabled ? styles.toggleEnabled : null]}
          onPress={() => setQuietHoursEnabled((prev) => !prev)}
        >
          <Text style={[styles.toggleText, quietHoursEnabled ? styles.toggleTextEnabled : null]}>
            Quiet hours: {quietHoursEnabled ? 'Attive' : 'Disattive'}
          </Text>
        </Pressable>

        <View style={styles.inlineFields}>
          <View style={styles.inlineField}>
            <Text style={styles.label}>Inizio (HH:mm)</Text>
            <TextInput
              value={quietHoursStart}
              onChangeText={setQuietHoursStart}
              placeholder="22:30"
              placeholderTextColor={colors.textMuted}
              style={styles.input}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inlineField}>
            <Text style={styles.label}>Fine (HH:mm)</Text>
            <TextInput
              value={quietHoursEnd}
              onChangeText={setQuietHoursEnd}
              placeholder="07:00"
              placeholderTextColor={colors.textMuted}
              style={styles.input}
              autoCapitalize="none"
            />
          </View>
        </View>
      </View>

      <Pressable style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salva</Text>
      </Pressable>

      {status ? <Text style={styles.status}>{status}</Text> : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 120,
    gap: 16,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  caption: {
    color: colors.textMuted,
    fontSize: 13,
  },
  field: {
    gap: 8,
  },
  block: {
    gap: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 12,
  },
  blockTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  inlineFields: {
    flexDirection: 'row',
    gap: 10,
  },
  inlineField: {
    flex: 1,
    gap: 8,
  },
  policyButton: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  policyButtonActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  policyText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
  },
  policyTextActive: {
    color: colors.primaryDark,
  },
  label: {
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
  button: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  status: {
    color: colors.primary,
    fontSize: 13,
  },
  hint: {
    color: colors.textMuted,
    fontSize: 12,
  },
  toggleButton: {
    marginTop: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  toggleEnabled: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  toggleText: {
    color: colors.textPrimary,
    fontWeight: '600',
    fontSize: 13,
  },
  toggleTextEnabled: {
    color: colors.primaryDark,
  },
});

export default SettingsScreen;
