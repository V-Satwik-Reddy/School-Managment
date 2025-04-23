const db = require('./model');

function getRandomLatLon(baseLat, baseLon, radiusKm) {
  const r = radiusKm / 111; // 1 deg lat ~ 111 km
  const u = Math.random();
  const v = Math.random();
  const w = r * Math.sqrt(u);
  const t = 2 * Math.PI * v;
  const lat = baseLat + w * Math.cos(t);
  const lon = baseLon + w * Math.sin(t) / Math.cos(baseLat * Math.PI / 180);
  return [parseFloat(lat.toFixed(6)), parseFloat(lon.toFixed(6))];
}

const baseLat = 17.385044;
const baseLon = 78.486671;

for (let i = 1; i <= 100; i++) {
  const [lat, lon] = getRandomLatLon(baseLat, baseLon, 10);
  const name = `School ${i}`;
  const address = `Area ${i}, Hyderabad`;

  db.query(
    'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
    [name, address, lat, lon],
    (err, result) => {
      if (err) console.error(`Error adding ${name}:`, err);
      else console.log(`${name} inserted`);
    }
  );
}
