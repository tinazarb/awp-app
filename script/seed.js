'use strict';

const {
  db,
  models: { User, Photo, Favorites },
} = require('../server/db');

const photos = [
  {
    id: 1,
    name: 'Woman with a veil on Fifth Avenue',
    description:
      'NYC 1968 gelatin silver print, 20 x 16 inches (sheet) [50.8 x 40.6 cm]',
    category: 'Fine Art',
    imgUrl:
      'https://i0.wp.com/fraenkelgallery.com/wp-content/uploads/2012/02/DA-0949.jpg?w=2000&quality=90&strip=all&ssl=1',
  },
  {
    id: 2,
    name: 'Two female impersonators backstage',
    description:
      'NYC 1962 gelatin silver print, 14 x 11 inches (sheet) [35.6 x 27.9 cm]',
    category: 'Fine Art',
    imgUrl:
      'https://i0.wp.com/fraenkelgallery.com/wp-content/uploads/2012/02/DA-0755.jpg?w=1330&quality=90&strip=all&ssl=1',
  },
  {
    id: 3,
    name: 'Identical Twins',
    description: 'Roselle, New Jersey 1967',
    category: 'Fine Art',
    imgUrl:
      'https://publicdelivery.org/wp-content/uploads/2019/08/Diane-Arbus-Identical-Twins-Roselle-New-Jersey-1967-2.jpg',
  },
  {
    id: 4,
    name: 'Child with Toy Hand Grenade in Central Park',
    description: 'NYC 1962',
    category: 'Fine Art',
    imgUrl:
      'https://www.moca.org/storage/app/uploads/public/5a6/a40/04b/thumb_2982_1120_0_0_0_auto.jpg',
  },
  {
    id: 5,
    name: 'Eddie Carmel, Jewish Giant',
    description: 'Taken at Home with His Parents in the Bronx, New York, 1970',
    category: 'Fine Art',
    imgUrl:
      'https://static01.nyt.com/images/2014/04/13/arts/13ARBUS2/13ARBUS2-superJumbo.jpg',
  },
];
/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ]);

  await Promise.all(
    photos.map((photo) => {
      return Photo.create(photo);
    })
  );

  console.log('PHOTO MAGIC METHODS', Object.keys(Photo.prototype));

  console.log('FAVORITES MAGIC METHODS', Object.keys(Favorites.prototype));

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
