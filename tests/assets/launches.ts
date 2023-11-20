import { Launch } from '../../src/app/models/launch';

export const LAUNCHES: Launch[] = [
  {
    id: '1',
    name: 'LaunchName',
    net: new Date('2000-01-01'),
    pad: {
      name: 'PadName',
      location: {
        name: 'PadLocationName',
      },
    },
    slug: 'LaunchSlug',
    status: {
      name: 'LaunchStatusName',
    },
  }
];
