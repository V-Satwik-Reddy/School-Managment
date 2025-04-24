const axios = require('axios');

function getRandomLatLon(baseLat, baseLon, radiusKm) {
  const r = radiusKm / 111;
  const u = Math.random();
  const v = Math.random();
  const w = r * Math.sqrt(u);
  const t = 2 * Math.PI * v;
  const lat = baseLat + w * Math.cos(t);
  const lon = baseLon + w * Math.sin(t) / Math.cos(baseLat * Math.PI / 180);
  return [parseFloat(lat.toFixed(6)), parseFloat(lon.toFixed(6))];
}

const url = 'https://school-managment.up.railway.app/addSchool';

const cities = [
  { name: "Hyderabad", lat: 17.385044, lon: 78.486671 },
  { name: "Delhi", lat: 28.613939, lon: 77.209021 },
  { name: "Mumbai", lat: 19.076090, lon: 72.877426 },
  { name: "Bangalore", lat: 12.971599, lon: 77.594566 },
  { name: "Chennai", lat: 13.082680, lon: 80.270718 },
  { name: "Pune", lat: 18.520430, lon: 73.856743 },
  { name: "Kolkata", lat: 22.572645, lon: 88.363892 },
  { name: "Ahmedabad", lat: 23.022505, lon: 72.571362 },
  { name: "Jaipur", lat: 26.912434, lon: 75.787270 },
  { name: "Lucknow", lat: 26.846695, lon: 80.946167 }
];

async function addSchools() {
  for (const city of cities) {
    for (let i = 1; i <= 100; i++) {
      const [lat, lon] = getRandomLatLon(city.lat, city.lon, 10);
      const name = `${city.name} School ${i}`;
      const address = `Area ${i}, ${city.name}`;

      try {
        const response = await axios.post(url, {
          name,
          address,
          latitude: lat,
          longitude: lon,
        });
        console.log(`${name} inserted successfully`);
      } catch (error) {
        console.error(`Error adding ${name}:`, error?.response?.data || error.message);
      }
    }
  }
}

addSchools();
