import {faker} from '@faker-js/faker';

// ----------------------------------------------------------------------

export const parts = [
  {
    name: "Fl",
    japanese: "フルート",
    members: [
        "a", "i"
    ],
    rate: faker.number.float({min: 0, max: 100, precision: 0.01}),
  },
  {
    name: "Cl",
    japanese: "クラリネット",
    members: [
      "a", "i"
    ],
    rate: faker.number.float({min: 0, max: 100, precision: 0.01}),
  },
  {
    name: "Wr",
    japanese: "ダブルリード",
    members: [
      "a", "i"
    ],
    rate: faker.number.float({min: 0, max: 100, precision: 0.01}),
  },
]
