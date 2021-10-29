// local testing code from main.js

// mock data
const myFavouritesInfo = [
  {
    timestamp: new Date(),
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
];

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
