import { loadSettings } from './settingsService';

const REQUEST_TIMEOUT_MS = 12000;

const normalizeBaseUrl = (raw: string) => raw.trim().replace(/\/$/, '');

const isLocalHost = (value: string) => /localhost|127\.0\.0\.1|::1/i.test(value);

export class BackendConnectionError extends Error {
  baseUrl: string;

  constructor(message: string, baseUrl: string) {
    super(message);
    this.name = 'BackendConnectionError';
    this.baseUrl = baseUrl;
  }
}

export const getBackendBaseUrl = async (): Promise<string> => {
  const settings = await loadSettings();
  const baseUrl = normalizeBaseUrl(settings.backendBaseUrl || '');

  if (typeof window !== 'undefined' && baseUrl) {
    const currentHost = window.location.hostname;
    if (!isLocalHost(currentHost) && isLocalHost(baseUrl)) {
      throw new BackendConnectionError(
        'Il backend e configurato su localhost, non raggiungibile da questo dispositivo.',
        baseUrl
      );
    }
  }

  return baseUrl;
};

export const fetchBackendJson = async <T>(path: string): Promise<T> => {
  const baseUrl = await getBackendBaseUrl();
  if (!baseUrl) {
    throw new BackendConnectionError('Backend base URL non configurato.', baseUrl);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(`${baseUrl}${path}`, { signal: controller.signal });
  } catch {
    throw new BackendConnectionError('Connessione al backend non riuscita.', baseUrl);
  } finally {
    clearTimeout(timeoutId);
  }

  if (!response.ok) {
    throw new BackendConnectionError(`Backend error ${response.status}`, baseUrl);
  }

  return (await response.json()) as T;
};
