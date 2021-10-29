require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();

const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL;
const MONGO_DB = process.env.MONGO_DB;
// connection pool
const mongoClient = new MongoClient(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// make utility function
const trimAndLowerCaseFn = (input) => {
  return input.trim().toLowerCase();
};

// make body object
const mkMyFavourites = (params) => {
  const favSeries = [
    trimAndLowerCaseFn(params['favourite-series1']),
    trimAndLowerCaseFn(params['favourite-series2']),
    trimAndLowerCaseFn(params['favourite-series3']),
  ];
  return {
    timestamp: new Date(),
    nickname: trimAndLowerCaseFn(params.nickname),
    email: trimAndLowerCaseFn(params.email),
    'favourite-color': trimAndLowerCaseFn(params['favourite-color']),
    'favourite-series': favSeries,
    coke: Number(params.coke),
    joke: trimAndLowerCaseFn(params.joke),
    countries: Number(params.countries),
    durians: JSON.parse(params.durians),
    likes: Number(params.likes),
  };
};

app.use(express.json());
app.use(morgan('combined'));

// local MongoDB - get all documents
app.get('/my-favourites', async (req, res) => {
  try {
    const client = await MongoClient.connect(MONGO_URL);
    const db = client.db(MONGO_DB);
    const entries = await db
      .collection('entries')
      .find()
      .sort({ _id: -1 })
      .toArray();
    res.status(200).type('application/json');
    res.send(entries);
    console.log('ENTRIES >>>> ', entries);
    client.close();
  } catch (error) {
    res.status(500).type('application/json');
    res.json({ message: 'Error connecting to MongoDB >>>>>', error });
  }
});

// local MongoDB - GET
app.get('/my-favourites/:nickname', async (req, res) => {
  const nickname = trimAndLowerCaseFn(req.params.nickname);
  try {
    const client = await MongoClient.connect(MONGO_URL);
    const db = client.db(MONGO_DB);
    const entries = await db.collection('entries').findOne({ nickname });
    res.status(200).type('application/json');
    res.send(entries);
    console.log('ENTRIES >>>> ', entries);
    client.close();
  } catch (error) {
    res.status(500).type('application/json');
    res.json({ message: 'Error connecting to MongoDB >>>>>', error });
  }
});

// local MongoDB - POST (insert ONE document)
app.post('/my-favourites/newentry', async (req, res) => {
  const entry = {
    timestame: new Date(),
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

  const newEntry = mkMyFavourites(entry);

  try {
    const client = await MongoClient.connect(MONGO_URL);
    const db = client.db(MONGO_DB);
    const entries = await db.collection('entries').insertOne(newEntry);

    res.status(200).type('application/json');
    res.send(entries);
    console.log('ENTRIES >>>> ', entries);
    client.close();
  } catch (error) {
    res.status(500).type('application/json');
    res.json({ message: 'Error connecting to MongoDB >>>>>', error });
  }
});

// local MongoDB - POST (increment likes by 1)
app.post('/my-favourites/:nickname/likes', async (req, res) => {
  const nickname = trimAndLowerCaseFn(req.params.nickname);
  try {
    const client = await MongoClient.connect(MONGO_URL);
    const db = client.db(MONGO_DB);
    await db
      .collection('entries')
      .updateOne({ nickname }, { $inc: { likes: 1 } });

    const entries = await db.collection('entries').findOne({ nickname });

    res.status(200).type('application/json');
    res.send(entries);
    console.log('ENTRIES >>>> ', entries);
    client.close();
  } catch (error) {
    res.status(500).type('application/json');
    res.json({ message: 'Error connecting to MongoDB >>>>>', error });
  }
});

// local MongoDB - PUT
app.put('/my-favourites/:nickname/edit', async (req, res) => {
  const entry = {
    timestame: new Date(),
    nickname: ' ALAdDIn   ',
    email: '       iloveprincessjasmine@gmail.com',
    'favourite-color': '     PInk',
    'favourite-series1': '    x ',
    'favourite-series2': 'Y',
    'favourite-series3': 'z     ',
    coke: '0.5',
    joke: '       xyz     ',
    countries: 3.0,
    durians: true,
    likes: '7',
  };

  const newEntry = mkMyFavourites(entry);
  console.log('NEW ENTRY >>>>>>> ', newEntry);
  const nickname = trimAndLowerCaseFn(req.params.nickname);
  try {
    const client = await MongoClient.connect(MONGO_URL);
    const db = client.db(MONGO_DB);
    await db.collection('entries').updateOne(
      { nickname },
      {
        $set: {
          nickname: newEntry.nickname,
          email: newEntry.email,
          'favourite-color': newEntry['favourite-color'],
          'favourite-series': newEntry['favourite-series'],
          coke: newEntry.coke,
          joke: newEntry.joke,
          countries: newEntry.countries,
          durians: newEntry.durians,
          likes: newEntry.likes,
        },
      }
    );

    const entries = await db.collection('entries').findOne({ nickname });

    res.status(200).type('application/json');
    res.send(entries);
    console.log('ENTRIES >>>> ', entries);
    client.close();
  } catch (error) {
    res.status(500).type('application/json');
    res.json({ message: 'Error connecting to MongoDB >>>>>', error });
  }
});

// local MongoDB - DELETE
app.delete('/my-favourites/:nickname/delete', async (req, res) => {
  const nickname = trimAndLowerCaseFn(req.params.nickname);
  try {
    const client = await MongoClient.connect(MONGO_URL);
    const db = client.db(MONGO_DB);
    await db.collection('entries').deleteOne({ nickname });

    const entries = await db
      .collection('entries')
      .find()
      .sort({ _id: -1 })
      .toArray();

    res.status(200).type('application/json');
    res.send(entries);
    console.log('ENTRIES >>>> ', entries);
    client.close();
  } catch (error) {
    res.status(500).type('application/json');
    res.json({ message: 'Error connecting to MongoDB >>>>>', error });
  }
});

// connect to MongoDB and listen to PORT
mongoClient
  .connect()
  .then(() => {
    app.listen(PORT, () => {
      console.info('Connected to MONGO DB!!!');
      console.info(`Application started on port ${PORT} at ${new Date()}`);
    });
  })
  .catch((error) => {
    console.error('CANNOT CONNECT TO MONGODB >>>>>> ', error);
  });
// start server with: nodemon
