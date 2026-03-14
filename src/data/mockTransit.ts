import { Departure, Stop, TransitMode } from '../types/transit';

export const MODE_LABELS: Record<TransitMode, string> = {
  bus: 'Autobus',
  metro: 'Metro',
  funicolare: 'Funicolare',
  tram: 'Tram',
  cumana: 'Cumana',
};

export const MODES: TransitMode[] = ['bus', 'metro', 'funicolare', 'tram', 'cumana'];

export const STOPS: Stop[] = [
  {
    id: 'napoli-garibaldi',
    name: 'Garibaldi',
    area: 'Centro',
    modes: ['metro'],
    lines: ['Linea 1', 'Linea 2'],
    nextArrivals: ['5 min', '12 min'],
  },
  {
    id: 'municipio',
    name: 'Municipio',
    area: 'Centro',
    modes: ['metro'],
    lines: ['Linea 1'],
    nextArrivals: ['3 min', '9 min'],
  },
  {
    id: 'montesanto',
    name: 'Montesanto',
    area: 'Quartieri',
    modes: ['funicolare', 'tram', 'cumana'],
    lines: ['Funicolare Centrale', 'Tram 1', 'Cumana 9'],
    nextArrivals: ['7 min', '18 min'],
  },
  {
    id: 'piazza-cavour',
    name: 'Piazza Cavour',
    area: 'Centro Storico',
    modes: ['metro', 'tram'],
    lines: ['Linea 1', 'Tram 2'],
    nextArrivals: ['4 min', '15 min'],
  },
  {
    id: 'posillipo',
    name: 'Posillipo',
    area: 'Posillipo',
    modes: ['bus'],
    lines: ['C21', 'C18'],
    nextArrivals: ['6 min', '20 min'],
  },
  {
    id: 'via-marina',
    name: 'Via Marina',
    area: 'Porto',
    modes: ['bus', 'tram'],
    lines: ['202', 'Tram 4'],
    nextArrivals: ['8 min', '17 min'],
  },
];

export const DEPARTURES: Record<string, Departure[]> = {
  'napoli-garibaldi': [
    {
      id: 'd1',
      line: 'Linea 1',
      destination: 'Piscinola',
      time: '10:24',
      mode: 'metro',
    },
    {
      id: 'd2',
      line: 'Linea 2',
      destination: 'Pozzuoli',
      time: '10:31',
      mode: 'metro',
    },
  ],
  municipio: [
    {
      id: 'd3',
      line: 'Linea 1',
      destination: 'Garibaldi',
      time: '10:22',
      mode: 'metro',
    },
  ],
  montesanto: [
    {
      id: 'd4',
      line: 'Funicolare Centrale',
      destination: 'Piazza Fuga',
      time: '10:18',
      mode: 'funicolare',
    },
    {
      id: 'd5',
      line: 'Tram 1',
      destination: 'Poggioreale',
      time: '10:40',
      mode: 'tram',
    },
    {
      id: 'd11',
      line: 'Cumana 9',
      destination: 'Torregaveta',
      time: '10:44',
      mode: 'cumana',
    },
  ],
  'piazza-cavour': [
    {
      id: 'd6',
      line: 'Linea 1',
      destination: 'Dante',
      time: '10:12',
      mode: 'metro',
    },
    {
      id: 'd7',
      line: 'Tram 2',
      destination: 'San Giovanni',
      time: '10:38',
      mode: 'tram',
    },
  ],
  posillipo: [
    {
      id: 'd8',
      line: 'C21',
      destination: 'Mergellina',
      time: '10:14',
      mode: 'bus',
    },
  ],
  'via-marina': [
    {
      id: 'd9',
      line: '202',
      destination: 'Garibaldi',
      time: '10:26',
      mode: 'bus',
    },
    {
      id: 'd10',
      line: 'Tram 4',
      destination: 'San Giovanni',
      time: '10:33',
      mode: 'tram',
    },
  ],
};
