// local testing code from main.js

// db.robotsInfo.insertMany([]);
// mock data
const myRobotsInfo = [
  {
    timestamp: new Date(),
    robot: 'https://robohash.org/22',
    nickname: 'fred & wilma',
    email: 'yabadabadoo123@hotmail.com',
    'favourite-color': 'Orange',
    'favourite-series': ['FullHouse', 'Moana', 'Superman'],
    coke: 2.9,
    joke: 'Why are iPhone chargers not called Apple Juice?!',
    countries: 10,
    durians: true,
    likes: 12,
  },
  {
    timestamp: new Date(),
    robot: 'https://robohash.org/813',
    nickname: 'supremo',
    email: 'yabadabadoo123@bedrock.com',
    'favourite-color': 'Red',
    'favourite-series': ['Wolfgang', 'Moana', 'Superman'],
    coke: 3.9,
    joke: 'Hip Hip Array!',
    countries: 10,
    durians: false,
    likes: 2,
  },
  {
    timestamp: new Date(),
    robot: 'https://robohash.org/492',
    nickname: 'casper',
    email: 'thefriendlyghost@yahoo.com',
    'favourite-color': 'Yellow',
    'favourite-series': ['Zack & Cody', 'Squid Game', 'Scream'],
    coke: 0.5,
    joke: 'The generation of random numbers is too important to be left to chance.',
    countries: 15,
    durians: false,
    likes: 0,
  },
  {
    timestamp: new Date(),
    robot: 'https://robohash.org/812',
    nickname: 'batman',
    email: 'fredismine@yahoo.com',
    'favourite-color': 'Green',
    'favourite-series': ['3rd Rock From the Sun', 'Moana', 'Batman'],
    coke: 4.2,
    joke: 'The computer is mightier than the pen, the sword, and usually, the programmer.',
    countries: 10,
    durians: true,
    likes: 14,
  },
  {
    timestamp: new Date(),
    robot: 'https://robohash.org/81',
    nickname: 'snowwhite',
    email: 'apple123@gmail.com',
    'favourite-color': 'Blue',
    'favourite-series': ['FullHouse', 'Silicon Valley', 'Cars'],
    coke: 5.9,
    joke: 'What drink did the Node developer had? Expresso.',
    countries: 3,
    durians: true,
    likes: 40,
  },
  {
    timestamp: new Date(),
    robot: 'https://robohash.org/534',
    nickname: 'lao fu zhi',
    email: 'liangpopo@hotmail.com',
    'favourite-color': 'Indigo',
    'favourite-series': ['Batman', 'Lucifer', 'Catman'],
    coke: 4.2,
    joke: 'Debugging: Removing the needles from the haystack.',
    countries: 5,
    durians: false,
    likes: 30,
  },
  {
    timestamp: new Date(),
    robot: 'https://robohash.org/824',
    nickname: 'the jetsons',
    email: 'thejetsons123@future.com',
    'favourite-color': 'Violet',
    'favourite-series': ['FullHouse', 'Silicon Valley', 'Squid Game'],
    coke: 0.7,
    joke: 'rm -rf uh oh...',
    countries: 1,
    durians: false,
    likes: 1,
  },
  {
    timestamp: new Date(),
    robot: 'https://robohash.org/2',
    nickname: 'scooby doo',
    email: 'whereareyou123@gmail.com',
    'favourite-color': 'Green',
    'favourite-series': ['Silicon Valley', 'Squid Game', 'Lucifer'],
    coke: 1.8,
    joke: 'A man walked into a bar. Ouch.',
    countries: 5,
    durians: true,
    likes: 2,
  },
  {
    timestamp: new Date(),
    robot: 'https://robohash.org/43',
    nickname: 'beep beep',
    email: 'fredismine@yahoo.com',
    'favourite-color': 'Red',
    'favourite-series': ['3rd Rock From the Sun', 'Zack & Cody', 'Kojak'],
    coke: 4.2,
    joke: "We'll we'll we'll...if it isn't autocorrect.",
    countries: 1,
    durians: true,
    likes: 4,
  },
  {
    timestamp: new Date(),
    robot: 'https://robohash.org/4',
    nickname: 'cinderella',
    email: 'pumpkincoach123@gmail.com',
    'favourite-color': 'Yellow',
    'favourite-series': ['Moana', 'Hannah Montana', 'Cars'],
    coke: 4.2,
    joke: 'What drink did the Node developer had? Expresso.',
    countries: 23,
    durians: false,
    likes: 0,
  },
  {
    timestamp: new Date(),
    robot: 'https://robohash.org/5',
    nickname: 'little lulu',
    email: 'sheiscute123@gmail.com',
    'favourite-color': 'Orange',
    'favourite-series': ['Batman', 'Superman', 'Catman'],
    coke: 4.2,
    joke: '.... go find Joker for jokes ....',
    countries: 245,
    durians: false,
    likes: 50,
  },
  {
    timestamp: new Date(),
    robot: 'https://robohash.org/56',
    nickname: 'pebbles',
    email: 'bambam@bedrock.com',
    'favourite-color': 'Violet',
    'favourite-series': ['Catman', 'Silicon Valley', 'FullHouse'],
    coke: 0.7,
    joke: 'Real programmers count from 0',
    countries: 31,
    durians: false,
    likes: 21,
  },
];

// mock req.body
const entry = {
  robotNumber: '5674',
  nickname: ' ALAdDIn   ',
  email: '       iloveprincessjasmine@gmail.com',
  'favourite-color': '     IndiGO',
  'favourite-series1': '    x ',
  'favourite-series2': 'Y',
  'favourite-series3': 'z     ',
  coke: '0.5',
  joke: '       xyz     ',
  countries: 3.0,
  durians: true,
  likes: '7',
};

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
