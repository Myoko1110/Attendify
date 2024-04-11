import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const users = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  part: sample([
    'Fl',
    'Cl',
    'Wr',
    'Sax',
    'Tp',
    'Tb',
    'Hr',
    'Bass',
    'Per',
  ]),
  grade: sample([
    '中1',
    '中2',
    '中3',
    '高1',
    '高2',
  ]),
  rate: faker.number.float({min: 0, max: 100, precision: 0.01})
}));
