import { faker } from '@faker-js/faker';

const fakeStadiums = Array.from({ length: 4 }).map(() => ({
  name: faker.company.name(),
  city: faker.address.city(),
  street: faker.address.street(),
  country: faker.address.country(),
  longitude: faker.address.longitude(),
  latitude: faker.address.latitude(),
  capacity: faker.finance.amount(10000, 65000, 0),
  image: faker.image.business(800, 600, true),
}));

const fakeUsers = Array.from({ length: 4 }).map(() => ({
  firstname: faker.name.firstName(),
  lastname: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  avatar: faker.image.avatar(),
}));

const fakeComments = Array.from({ length: 4 }).map(() => ({
  text: faker.lorem.paragraph(),
}));

export { fakeStadiums, fakeUsers, fakeComments };
