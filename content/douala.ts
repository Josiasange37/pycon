/** Douala: the host city of PyCon Cameroon 2027. Facts checked against public sources (Nov 2026). */

const maps = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export const CITY_FACTS = [
  { value: '75–85%', label: 'of Cameroon’s trade goes through the Port of Douala' },
  { value: '1,830 m', label: 'the first Wouri bridge, opened in 1955' },
  { value: '~3.8 M', label: 'people in the city, the country’s largest' },
  { value: 'DLA', label: 'Douala International Airport, Cameroon’s main hub' },
];

export const SIGHTS = [
  {
    name: 'La Nouvelle Liberté',
    area: 'Deïdo roundabout',
    body: 'Joseph-Francis Sumégné’s 12-metre figure, built from scrap metal in 1996. Locals call it the “Njo Njo of Deïdo”. It is the figure in our logo.',
    maps: maps('La Nouvelle Liberté, Rond-point Deïdo, Douala'),
  },
  {
    name: 'La Pagode',
    area: 'Bonanjo',
    body: 'The palace of the Bell kings, finished in 1905 for King Auguste Manga Ndumbe Bell. Still Bell family property; admire it from the street.',
    maps: maps('La Pagode, Bonanjo, Douala'),
  },
  {
    name: 'Cathédrale Saints-Pierre-et-Paul',
    area: 'Akwa',
    body: 'Twin towers over Akwa since 1936. Quiet inside, a good break from the traffic outside.',
    maps: maps('Cathédrale Saints-Pierre-et-Paul, Douala'),
  },
  {
    name: 'The Wouri waterfront',
    area: 'Bonanjo · Bonabéri',
    body: 'The estuary that gave Cameroon its name: Portuguese sailors called it Rio dos Camarões, the river of shrimp. Two bridges cross it to Bonabéri.',
    maps: maps('Pont sur le Wouri, Douala'),
  },
  {
    name: 'doual’art',
    area: 'Bonanjo',
    body: 'Contemporary art centre founded in 1991. Its Salon Urbain de Douala placed public art across the city, including La Nouvelle Liberté.',
    maps: maps("doual'art, Bonanjo, Douala"),
  },
  {
    name: 'Marché des Fleurs',
    area: 'Douala',
    body: 'Crafts, carvings, fabric and flowers. Bargaining is expected; go with a local if it is your first time.',
    maps: maps('Marché des Fleurs, Douala'),
  },
];

export const DAY_TRIPS = [
  { name: 'Limbe', distance: 'about 1 h 30 by road', body: 'Black-sand beaches below Mount Cameroon, a botanic garden from 1892 and a wildlife centre.' },
  { name: 'Buea', distance: 'about 1 h 30 by road', body: 'On the slopes of Mount Cameroon, West Africa’s highest peak. Cooler air and a busy tech scene.' },
  { name: 'Kribi', distance: 'about 3 h by road', body: 'Beaches on the Atlantic and the Lobé Falls, where a river drops straight into the sea.' },
];

/** Monthly rainfall, mm, 1991–2020 normals (Wikipedia, Douala climate table). */
export const RAINFALL = [
  { m: 'Jan', mm: 35.6 },
  { m: 'Feb', mm: 55.9 },
  { m: 'Mar', mm: 154.9 },
  { m: 'Apr', mm: 238.8 },
  { m: 'May', mm: 274.3 },
  { m: 'Jun', mm: 355.6 },
  { m: 'Jul', mm: 680.7 },
  { m: 'Aug', mm: 690.9 },
  { m: 'Sep', mm: 558.8 },
  { m: 'Oct', mm: 403.9 },
  { m: 'Nov', mm: 124.5 },
  { m: 'Dec', mm: 30.5 },
];

export const GETTING_THERE = [
  {
    title: 'By air',
    body: 'Douala International Airport (DLA) is Cameroon’s main international hub, in the east of the city. Akwa and Bonanjo are 8–10 km away: 15–20 minutes without traffic, much longer in the evening rush or in heavy rain.',
  },
  {
    title: 'From the airport',
    body: 'Agree the fare before you get in. A taxi to Akwa or Bonanjo has typically cost 5,000–8,000 XAF. Many hotels run airport shuttles; ask when you book.',
  },
  {
    title: 'By road',
    body: 'Douala is about 210 km from Yaoundé. Coaches run all day between the two cities; allow four hours or more.',
  },
  {
    title: 'Around town',
    body: 'Yellow taxis are everywhere. A “dépôt” is a private ride at a set price; a “course” is negotiated. Ride-hailing apps also work in Douala. Moto-taxis (bensikin) are banned in Bonanjo.',
  },
];

export const HOTELS = [
  { name: 'Hotel Sawa', area: 'Bonanjo', note: 'Waterfront, historic quarter' },
  { name: 'Hotel Akwa Palace', area: 'Akwa', note: 'Business district, since 1951' },
  { name: 'Hotel La Falaise', area: 'Bonapriso', note: 'Residential, quieter' },
  { name: 'ONOMO Hotel Douala', area: 'Bonanjo', note: 'Airport shuttle' },
  { name: 'Ibis Douala', area: 'Bonanjo', note: 'Budget option' },
];
