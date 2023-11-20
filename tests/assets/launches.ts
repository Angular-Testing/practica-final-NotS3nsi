import { Launch } from '../../src/app/models/launch';

export const LAUNCHES: Launch[] = [
  {
    id: '1',
    name: 'Falcon 9 CRS-23',
    net: new Date('2023-08-15T12:00:00Z'),
    pad: {
      name: 'Kennedy Space Center Launch Complex 39A',
      location: {
        name: 'Merritt Island, Florida, USA',
      },
    },
    slug: 'falcon-9-crs-23',
    status: {
      name: 'Scheduled',
    },
  },
  {
    id: '2',
    name: 'Atlas V AEHF-6',
    net: new Date('2023-09-01T08:30:00Z'),
    pad: {
      name: 'Cape Canaveral Space Force Station Space Launch Complex 41',
      location: {
        name: 'Cape Canaveral, Florida, USA',
      },
    },
    slug: 'atlas-v-aehf-6',
    status: {
      name: 'Upcoming',
    },
  },
];
