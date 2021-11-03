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

// connect to MongoDBß
const connectToMongoDB = async (operations, res) => {
  try {
    const client = await MongoClient.connect(MONGO_URL);
    const db = client.db(MONGO_DB);
    await operations(db);
    client.close();
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
app.get('/robots', async (req, res) => {
  connectToMongoDB(async (db) => {
    const robots = await db
      .collection('robotsInfo')
      .find()
      .sort({ _id: -1 })
      .toArray();
    res.status(200).type('application/json');
    res.send(robots);
  }, res);
});

// local MongoDB - GET (1 robot)
app.get('/robots/:nickname', async (req, res) => {
  connectToMongoDB(async (db) => {
    const nickname = trimAndLowerCaseFn(req.params.nickname);
    const dbNickname = await db.collection('robotsInfo').findOne({ nickname });
    if (dbNickname !== null) {
      res.status(200).type('application/json');
      res.send(dbNickname);
    } else {
      res.status(200).type('application/json');
      res.send("Nickname doesn't exist 😿 ");
    }
  }, res);
});

// local MongoDB - POST (insert ONE document)
app.post('/robots/newrobot', async (req, res) => {
  console.log('REQ BODY >>>>>> ', req.body);
  // add validation e.g nickname not more than x character
  const { nickname, email, coke, joke, countries, durians, likes } = req.body;
  const robot = {
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
  const newRobot = mkMyFavourites(robot);

  connectToMongoDB(async (db) => {
    const dbNickname = await db
      .collection('robotsInfo')
      .findOne({ nickname: trimAndLowerCaseFn(req.body.nickname) });
    if (dbNickname === null) {
      const robots = await db.collection('robotsInfo').insertOne(newRobot);

      res.status(200).type('application/json');
      res.send(robots);
    } else {
      res.send('Nickname already exist 🤦‍♂️ ');
    }
  }, res);
});

// local MongoDB - POST (increment likes by 1)
app.post('/robots/:nickname/likes', async (req, res) => {
  const nickname = trimAndLowerCaseFn(req.params.nickname);
  connectToMongoDB(async (db) => {
    const dbNickname = await db.collection('robotsInfo').findOne({ nickname });

    if (dbNickname !== null) {
      await db
        .collection('robotsInfo')
        .updateOne({ nickname }, { $inc: { likes: 1 } });

      const updatedRobots = await db
        .collection('robotsInfo')
        .find()
        .sort({ _id: -1 })
        .toArray();

      res.status(200).type('application/json');
      res.send(updatedRobots);
    } else {
      res.send("Nickname doesn't exist 🤷‍♂️");
    }
  }, res);
});

// local MongoDB - PUT (edit 1 robot)
app.put('/robots/:nickname/edit', async (req, res) => {
  const paramsnickname = trimAndLowerCaseFn(req.params.nickname);
  const { nickname, email, coke, joke, countries, durians, likes } = req.body;
  const robot = {
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
  const newRobot = mkMyFavourites(robot);

  connectToMongoDB(async (db) => {
    const dbNickname = await db
      .collection('robotsInfo')
      .findOne({ nickname: paramsnickname });

    if (dbNickname !== null) {
      await db.collection('robotsInfo').updateOne(
        { nickname: paramsnickname },
        {
          $set: {
            nickname: newRobot.nickname,
            email: newRobot.email,
            'favourite-color': newRobot['favourite-color'],
            'favourite-series': newRobot['favourite-series'],
            coke: newRobot.coke,
            joke: newRobot.joke,
            countries: newRobot.countries,
            durians: newRobot.durians,
            likes: newRobot.likes,
          },
        }
      );

      res.status(200).type('application/json');
      res.send('Robot is updated SUCCESSFULLY! 🥰');
    } else {
      res.send("Nickname doesn't exist 🤷‍♂️");
    }
  }, res);
});

// local MongoDB - DELETE
app.delete('/robots/:nickname/delete', async (req, res) => {
  const nickname = trimAndLowerCaseFn(req.params.nickname);
  connectToMongoDB(async (db) => {
    const nicknameExists = await db
      .collection('robotsInfo')
      .findOne({ nickname });

    if (nicknameExists !== null) {
      await db.collection('robotsInfo').deleteOne({ nickname });

      const updatedRobots = await db
        .collection('robotsInfo')
        .find()
        .sort({ _id: -1 })
        .toArray();
      res.status(200).type('application/json');
      res.send(updatedRobots);
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
