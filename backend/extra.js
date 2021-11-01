// local testing code from main.js

// db.entries.insertMany([]);
// mock data
const myFavouritesInfo = [
  {
    timestamp: new Date(),
    robot: 'https://robohash.org/22',
    nickname: 'fred flintstone',
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
    robot: 'https://robohash.org/83',
    nickname: 'barney flintstone',
    email: 'yabadabadoo123@bedrock.com',
    'favourite-color': 'Turqoise',
    'favourite-series': ['Wolfgang', 'Moana', 'Superman'],
    coke: 3.9,
    joke: 'Hip Hip Array!',
    countries: 10,
    durians: false,
    likes: 2,
  },
  {
    timestamp: new Date(),
    robot: 'https://robohash.org/112',
    nickname: 'casper',
    email: 'thefriendlyghost@yahoo.com',
    'favourite-color': 'White',
    'favourite-series': ['Zack & Cody', 'Squid Game', 'Scream'],
    coke: 0.5,
    joke: 'The generation of random numbers is too important to be left to chance.',
    countries: 15,
    durians: false,
    likes: 0,
  },
  {
    timestamp: new Date(),
    robot: 'https://robohash.org/423',
    nickname: 'batman',
    email: 'fredismine@yahoo.com',
    'favourite-color': 'Pink',
    'favourite-series': ['3rd Rock From the Sun', 'Moana', 'Batman'],
    coke: 4.2,
    joke: 'The computer is mightier than the pen, the sword, and usually, the programmer.',
    countries: 10,
    durians: true,
    likes: 14,
  },
  {
    timestamp: new Date(),
    robot: 'https://robohash.org/921',
    nickname: 'snowwhite',
    email: 'apple123@gmail.com',
    'favourite-color': 'Red',
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
    nickname: 'Lao Fu Zhi',
    email: 'liangpopo@hotmail.com',
    'favourite-color': 'Gray',
    'favourite-series': ['Batman', 'Lucifer', 'Catman'],
    coke: 4.2,
    joke: 'Debugging: Removing the needles from the haystack.',
    countries: 5,
    durians: false,
    likes: 30,
  },
  {
    timestamp: new Date(),
    robot: 'https://robohash.org/631',
    nickname: 'the jetsons',
    email: 'thejetsons123@future.com',
    'favourite-color': 'Blue',
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
    'favourite-color': 'White',
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
    nickname: 'wilma flintstone',
    email: 'fredismine@yahoo.com',
    'favourite-color': 'Pink',
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
    'favourite-color': 'Blue',
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
    'favourite-color': 'Pink',
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
    nickname: 'Pebbles',
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
  nickname: ' ALAdDIn   ',
  email: '       iloveprincessjasmine@gmail.com',
  'favourite-color': '     PurPLE',
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
app.get('/my-favourites/:nickname', (req, res) => {
  const nickname = req.params.nickname;
  res.status(200).type('application/json');
  res.send(nickname); // see in postman
  // console.log('CARTOOOOOON >>> ', nickname); // log in terminal
});

// local test POST
app.post('/my-favourites', (req, res) => {
  const nickname = req.body.nickname;
  const age = req.body.age;
  res.send(`Hello ${nickname}, you are ${age} years young`); // see in postman
});

// local test GET
app.get('/my-favourites', (req, res) => {
  res.status(200).type('application/json');
  res.send(myFavouritesInfo);
});

// local test POST
app.post('/my-favourites/:nickname/likes', (req, res) => {
  const nickname = req.params.nickname;
  const likesOfNickname = myFavouritesInfo.filter(
    (who) => who.nickname === nickname
  )[0];
  // console.log('likesOfNickname >>>> ', likesOfNickname.likes);
  likesOfNickname.likes += 1;
  res.status(200).type('application/json');
  res.send(`${nickname} now has ${likesOfNickname.likes} likes`);
  console.log('NEW INFO >>>>>>>> ', myFavouritesInfo);
});

// local test POST
app.post('/my-favourites/newentry', (req, res) => {
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
  myFavouritesInfo.push(newEntry);
  res.status(200).type('application/json');
  res.send(myFavouritesInfo);
  console.log('NEW INFO >>>>>>>> ', myFavouritesInfo);
});

// local test PUT
app.put('/my-favourites/:nickname/edit', (req, res) => {
  const nickname = req.params.nickname;
  const updatedMyFavouritesInfo = myFavouritesInfo.filter(
    (who) => who.nickname === nickname
  )[0];
  updatedMyFavouritesInfo.nickname = 'Rumpelstilskin';
  res.status(200).type('application/json');
  res.send(updatedMyFavouritesInfo);
  console.log('NEW INFO >>>>>>>> ', myFavouritesInfo);
});

// local test DELETE
app.delete('/my-favourites/:nickname/delete', (req, res) => {
  const nickname = req.params.nickname;
  const updatedMyFavouritesInfo = myFavouritesInfo.filter(
    (who) => who.nickname !== nickname
  );
  res.status(200).type('application/json');
  res.send(updatedMyFavouritesInfo);
  console.log('NEW INFO >>>>>>>> ', myFavouritesInfo);
});
