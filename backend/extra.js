// local testing code from main.js
/**
 * show dbs
 * use xx
 * db.robotsInfo.insertOne()
 * db.robotsInfo.insertMany([])
 */
// mock data
const myRobotsInfo = [
  {
    timestamp: new Date(2018, 07, 29, 08, 35, 02, 0),
    nickname: 'fred & wilma',
    email: 'yabadabadoo123@hotmail.com',
    robotNumber: 22,
    robotUrl: 'https://robohash.org/22',
    'favourite-color': 'Orange',
    'favourite-series': ['FullHouse', 'Moana', 'Superman'],
    coke: '2.9',
    joke: 'Why are iPhone chargers not called Apple Juice?!',
    countries: 10,
    durians: true,
    likes: 12,
  },
  {
    timestamp: new Date(2020, 03, 14, 02, 35, 30, 0),
    nickname: 'supremo',
    email: 'teamosupremeo@superheros.com',
    robotNumber: 813,
    robotUrl: 'https://robohash.org/813',
    'favourite-color': 'Red',
    'favourite-series': ['Wolfgang'],
    coke: '3.1',
    joke: 'Hip Hip Array!',
    countries: 100,
    durians: false,
    likes: 2,
  },
  {
    timestamp: new Date(2021, 10, 07, 22, 35, 10, 0),
    nickname: 'casper',
    email: 'thefriendlyghost@yahoo.com',
    robotNumber: 492,
    robotUrl: 'https://robohash.org/492',
    'favourite-color': 'Yellow',
    'favourite-series': ['Zack & Cody', 'Squid Game', 'Scream'],
    coke: '0.5',
    joke: 'The generation of random numbers is too important to be left to chance.',
    countries: 15,
    durians: false,
    likes: 0,
  },
  {
    timestamp: new Date(2020, 01, 02, 18, 35, 04, 0),
    nickname: 'batman',
    email: 'fredismine@yahoo.com',
    robotNumber: 812,
    robotUrl: 'https://robohash.org/812',
    'favourite-color': 'Green',
    'favourite-series': ['3rd Rock From the Sun', 'Batman'],
    coke: '7.7',
    joke: 'The computer is mightier than the pen, the sword, and usually, the programmer.',
    countries: 10,
    durians: true,
    likes: 14,
  },
  {
    timestamp: new Date(1999, 04, 25, 08, 35, 20, 0),
    nickname: 'snowwhite',
    email: 'apple123@gmail.com',
    robotNumber: 81,
    robotUrl: 'https://robohash.org/81',
    'favourite-color': 'Blue',
    'favourite-series': ['Silicon Valley', 'Cars'],
    coke: '5.9',
    joke: 'What drink did the Node developer had? Expresso.',
    countries: 3,
    durians: true,
    likes: 40,
  },
  {
    timestamp: new Date(2021, 08, 30, 10, 35, 30, 0),
    nickname: 'lao fu zhi',
    email: 'liangpopo@hotmail.com',
    robotNumber: 534,
    robotUrl: 'https://robohash.org/534',
    'favourite-color': 'Indigo',
    'favourite-series': ['Lucifer', 'Superman'],
    coke: '1.2',
    joke: 'Debugging: Removing the needles from the haystack.',
    countries: 5,
    durians: true,
    likes: 3,
  },
  {
    timestamp: new Date(2020, 02, 07, 20, 35, 51, 0),
    nickname: 'the jetsons',
    email: 'thejetsons123@future.com',
    robotNumber: 824,
    robotUrl: 'https://robohash.org/824',
    'favourite-color': 'Violet',
    'favourite-series': ['FullHouse', 'Silicon Valley', 'Squid Game'],
    coke: '0.9',
    joke: 'rm -rf uh oh...',
    countries: 1,
    durians: false,
    likes: 1,
  },
  {
    timestamp: new Date(2021, 06, 15, 17, 35, 44, 0),
    nickname: 'scooby doo',
    email: 'whereareyou123@gmail.com',
    robotNumber: 2,
    robotUrl: 'https://robohash.org/2',
    'favourite-color': 'Green',
    'favourite-series': ['Silicon Valley', 'Squid Game'],
    coke: '1.8',
    joke: 'A man walked into a bar. Ouch.',
    countries: 65,
    durians: true,
    likes: 2,
  },
  {
    timestamp: new Date(2000, 04, 20, 04, 35, 10, 0),
    nickname: 'beep beep',
    email: 'fredismine@yahoo.com',
    robotNumber: 43,
    robotUrl: 'https://robohash.org/43',
    'favourite-color': 'Red',
    'favourite-series': ['3rd Rock From the Sun'],
    coke: '3.2',
    joke: "We'll we'll we'll...if it isn't autocorrect.",
    countries: 1,
    durians: true,
    likes: 4,
  },
  {
    timestamp: new Date(1997, 09, 21, 21, 35, 04, 0),
    nickname: 'cinderella',
    email: 'pumpkincoach123@gmail.com',
    robotNumber: 4,
    robotUrl: 'https://robohash.org/4',
    'favourite-color': 'Yellow',
    'favourite-series': ['Moana', 'Cars'],
    coke: '4.2',
    joke: 'What drink did the Node developer had? Expresso.',
    countries: 23,
    durians: false,
    likes: 0,
  },
  {
    timestamp: new Date(2015, 05, 04, 23, 35, 30, 0),
    nickname: 'little lulu',
    email: 'sheiscute123@gmail.com',
    robotNumber: 5,
    robotUrl: 'https://robohash.org/5',
    'favourite-color': 'Indigo',
    'favourite-series': ['Batman'],
    coke: '0.2',
    joke: '.... go find Joker for jokes ....',
    countries: 25,
    durians: false,
    likes: 37,
  },
  {
    timestamp: new Date(2014, 11, 17, 14, 35, 10, 0),
    nickname: 'pebbles',
    email: 'bambam@bedrock.com',
    robotNumber: 56,
    robotUrl: 'https://robohash.org/56',
    'favourite-color': 'Violet',
    'favourite-series': ['Silicon Valley', 'FullHouse'],
    coke: '1.7',
    joke: 'Real programmers count from 0',
    countries: 31,
    durians: false,
    likes: 21,
  },
];

// local test GET
app.get('/', (req, res) => {
  res.status(200);
  res.type('application/json');
  res.send({ Hello: 'Kitty' });
});

// local test GET
app.get('/robots/:nickname', (req, res) => {
  const nickname = req.params.nickname;
  res.status(200).type('application/json');
  res.send(nickname); // see in postman
  // console.log('CARTOOOOOON >>> ', nickname); // log in terminal
});

// local test POST
app.post('/robots', (req, res) => {
  const nickname = req.body.nickname;
  const age = req.body.age;
  res.send(`Hello ${nickname}, you are ${age} years young`); // see in postman
});

// local test GET
app.get('/robots', (req, res) => {
  res.status(200).type('application/json');
  res.send(myRobotsInfo);
});

// local test POST
app.post('/robots/:nickname/likes', (req, res) => {
  const nickname = req.params.nickname;
  const likesOfNickname = myRobotsInfo.filter(
    (who) => who.nickname === nickname
  )[0];
  // console.log('likesOfNickname >>>> ', likesOfNickname.likes);
  likesOfNickname.likes += 1;
  res.status(200).type('application/json');
  res.send(`${nickname} now has ${likesOfNickname.likes} likes`);
  console.log('NEW INFO >>>>>>>> ', myRobotsInfo);
});

// local test POST
app.post('/robots/newentry', (req, res) => {
  const newEntry = {
    nickname: 'Aladdin',
    email: 'iloveprincessjasmine@gmail.com',
    'favourite-color': 'purple',
    'favourite-series': ['x', 'y', 'z'],
    coke: 0.5,
    joke: 'xyz',
    countries: 3,
    likes: 7,
  };
  myRobotsInfo.push(newEntry);
  res.status(200).type('application/json');
  res.send(myRobotsInfo);
  console.log('NEW INFO >>>>>>>> ', myRobotsInfo);
});

// local test PUT
app.put('/robots/:nickname/edit', (req, res) => {
  const nickname = req.params.nickname;
  const updatedMyFavouritesInfo = myRobotsInfo.filter(
    (who) => who.nickname === nickname
  )[0];
  updatedMyFavouritesInfo.nickname = 'Rumpelstilskin';
  res.status(200).type('application/json');
  res.send(updatedMyFavouritesInfo);
  console.log('NEW INFO >>>>>>>> ', myRobotsInfo);
});

// local test DELETE
app.delete('/robots/:nickname/delete', (req, res) => {
  const nickname = req.params.nickname;
  const updatedMyFavouritesInfo = myRobotsInfo.filter(
    (who) => who.nickname !== nickname
  );
  res.status(200).type('application/json');
  res.send(updatedMyFavouritesInfo);
  console.log('NEW INFO >>>>>>>> ', myRobotsInfo);
});
