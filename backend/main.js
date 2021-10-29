require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const { parse } = require('dotenv');

const app = express();

const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL;
const MONGO_DB = process.env.MONGO_DB;
// connection pool
const mongoClient = new MongoClient(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// connect to MongoDBß
const connectToMongoDB = async (operations, res) => {
  try {
    const client = await MongoClient.connect(MONGO_URL);
    const db = client.db(MONGO_DB);
    await operations(db);
    client.close();
    res.status(200).type('application/json');
  } catch (error) {
    res.status(500).type('application/json');
    res.json({ message: 'Error connecting to MongoDB', 'ERROR >>>>> ': error });
  }
};

// trim inputs and convert to lowercase
const trimAndLowerCaseFn = (input) => {
  return input.trim().toLowerCase();
};

// create body object
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

// local MongoDB - GET (all documents)
app.get('/my-favourites', async (req, res) => {
  connectToMongoDB(async (db) => {
    const entries = await db
      .collection('entries')
      .find()
      .sort({ _id: -1 })
      .toArray();
    res.send(entries);
  }, res);
});

// local MongoDB - GET (1 entry)
app.get('/my-favourites/:nickname', async (req, res) => {
  connectToMongoDB(async (db) => {
    const nickname = trimAndLowerCaseFn(req.params.nickname);
    const dbNickname = await db.collection('entries').findOne({ nickname });
    if (dbNickname !== null) {
      res.send(dbNickname);
    } else {
      res.send("Nickname doesn't exist 😿 ");
    }
  }, res);
});

// local MongoDB - POST (insert ONE document)
app.post('/my-favourites/newentry', async (req, res) => {
  const { nickname, email, coke, joke, countries, durians, likes } = req.body;
  const entry = {
    nickname,
    email,
    coke,
    joke,
    'favourite-color': req.body['favourite-color'],
    'favourite-series1': req.body['favourite-series1'],
    'favourite-series2': req.body['favourite-series2'],
    'favourite-series3': req.body['favourite-series3'],
    countries,
    durians,
    likes,
  };
  const newEntry = mkMyFavourites(entry);

  connectToMongoDB(async (db) => {
    const dbNickname = await db
      .collection('entries')
      .findOne({ nickname: trimAndLowerCaseFn(req.body.nickname) });
    if (dbNickname === null) {
      const entries = await db.collection('entries').insertOne(newEntry);
      res.send(entries);
    } else {
      res.send('Nickname already exist 🤦‍♂️ ');
    }
  }, res);
});

// local MongoDB - POST (increment likes by 1)
app.post('/my-favourites/:nickname/likes', async (req, res) => {
  const nickname = trimAndLowerCaseFn(req.params.nickname);
  connectToMongoDB(async (db) => {
    const dbNickname = await db.collection('entries').findOne({ nickname });
    if (dbNickname !== null) {
      await db
        .collection('entries')
        .updateOne({ nickname }, { $inc: { likes: 1 } });

      res.send('Entry has an extra LIKE 👍 !');
    } else {
      res.send("Nickname doesn't exist 🤷‍♂️");
    }
  }, res);
});

// local MongoDB - PUT (edit 1 entry)
app.put('/my-favourites/:nickname/edit', async (req, res) => {
  const paramsnickname = trimAndLowerCaseFn(req.params.nickname);
  const { nickname, email, coke, joke, countries, durians, likes } = req.body;
  const entry = {
    nickname,
    email,
    coke,
    joke,
    'favourite-color': req.body['favourite-color'],
    'favourite-series1': req.body['favourite-series1'],
    'favourite-series2': req.body['favourite-series2'],
    'favourite-series3': req.body['favourite-series3'],
    countries,
    durians,
    likes,
  };
  const newEntry = mkMyFavourites(entry);

  connectToMongoDB(async (db) => {
    const dbNickname = await db
      .collection('entries')
      .findOne({ nickname: paramsnickname });

    if (dbNickname !== null) {
      await db.collection('entries').updateOne(
        { nickname: paramsnickname },
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
      res.send('Entry is updated SUCCESSFULLY! 🥰');
    } else {
      res.send("Nickname doesn't exist 🤷‍♂️");
    }
  }, res);
});

// local MongoDB - DELETE
app.delete('/my-favourites/:nickname/delete', async (req, res) => {
  const nickname = trimAndLowerCaseFn(req.params.nickname);
  connectToMongoDB(async (db) => {
    const nicknameExists = await db.collection('entries').findOne({ nickname });

    if (nicknameExists !== null) {
      await db.collection('entries').deleteOne({ nickname });
      res.send('Entry is deleted ❎ SUCCESSFULLY!');
    } else {
      res.send("Nickname doesn't exist 🤷‍♂️");
    }
  }, res);
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
