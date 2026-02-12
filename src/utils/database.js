import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabaseSync('places.db');

export const init = () => {
  return database.execAsync(
    `CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      imageUri TEXT NOT NULL,
      address TEXT NOT NULL,
      lat REAL NOT NULL,
      lng REAL NOT NULL
    )`,
  );
};

export const insertPlace = (place) => {
  return database.runAsync(
    `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
    [
      place.title,
      place.imageUri,
      place.address,
      place.location.lat,
      place.location.lng,
    ],
  );
};

export const fetchPlaces = async () => {
  const allPlaces = await database.getAllAsync('SELECT * FROM places');
  if (allPlaces && allPlaces.length) {
    return allPlaces.map(
      (fp) =>
        new Place(
          fp.title,
          fp.imageUri,
          fp.address,
          {
            lat: fp.lat,
            lng: fp.lng,
          },
          fp.id,
        ),
    );
  }
  return [];
};
