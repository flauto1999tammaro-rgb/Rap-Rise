import { importGtfs } from 'gtfs';
import { readFile } from 'fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configPath = path.join(__dirname, '..', 'config.json');
const raw = await readFile(configPath, 'utf8');
const config = JSON.parse(raw);

try {
  await importGtfs(config);
  console.log('GTFS import completed.');
} catch (error) {
  console.error('GTFS import failed:', error);
  process.exit(1);
}
