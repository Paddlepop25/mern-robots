require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

const app = express();
app.use(express.static(path.join(__dirname, '/src/build')));

const PORT = process.env.PORT || 8000;
const MONGO_LOCAL = process.env.MONGO_LOCAL;
const MONGO_LOCAL_DB = process.env.MONGO_LOCAL_DB;
// const MONGO_CLOUD = process.env.MONGO_CLOUD;
// const MONGO_CLOUD_DB = process.env.MONGO_CLOUD_DB;
// connection poolh
const mongoClient = new MongoClient(MONGO_LOCAL, {
  // const mongoClient = new MongoClient(MONGO_CLOUD, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// connect to MongoDBß
const connectToMongoDB = async (operations, res) => {
  try {
    const client = await MongoClient.connect(MONGO_LOCAL);
    const db = client.db(MONGO_LOCAL_DB);
    // const client = await MongoClient.connect(MONGO_CLOUD);
    // const db = client.db(MONGO_CLOUD_DB);
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
const makeRobot = (params) => {
  return {
    timestamp: new Date(),
    nickname: trimAndLowerCaseFn(params.nickname),
    email: trimAndLowerCaseFn(params.email),
    robotNumber: params.robotNumber,
    robotUrl: `https://robohash.org/${params.robotNumber}`,
    'favourite-color': trimAndLowerCaseFn(params['favourite-color']),
    'favourite-series': params['favourite-series'],
    coke: params.coke,
    joke: params.joke.trim(),
    countries: params.countries,
    durians: params.durians,
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
      res.send("Get Nickname doesn't exist 😿 ");
    }
  }, res);
});

// local MongoDB - POST (insert ONE document)
app.post('/robots/newrobot', async (req, res) => {
  console.log('REQ BODY >>>>>> ', req.body);
  // add validation e.g nickname not more than x character
  const { nickname, email, robotNumber, coke, joke, countries, durians } =
    req.body;
  const robotInfo = {
    timestamp: new Date(),
    nickname,
    email,
    robotNumber,
    robotUrl: `https://robohash.org/${robotNumber}`,
    'favourite-color': req.body['favourite-color'],
    'favourite-series': req.body['favourite-series'],
    coke,
    joke,
    countries,
    durians,
    likes: 0,
  };

  try {
    const newRobot = makeRobot(robotInfo);
    console.log('>>>> NEW ROBOT >>>> ', newRobot);
    connectToMongoDB(async (db) => {
      const dbNickname = await db
        .collection('robotsInfo')
        .findOne({ nickname: trimAndLowerCaseFn(req.body.nickname) });
      if (dbNickname === null) {
        const robots = await db.collection('robotsInfo').insertOne(newRobot);

        res.status(200).type('application/json');
        res.send(robots);
      } else {
        res.send('Make new robot Nickname already exist 🤦‍♂️ ');
      }
    }, res);
  } catch (error) {
    console.log('>>>> ERROR >>>> ', error);
  }
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
      res.send("Post like robot Nickname doesn't exist 🤷‍♂️");
    }
  }, res);
});

// local MongoDB - PUT (edit 1 robot)
app.put('/robots/:nickname/edit', async (req, res) => {
  const paramsnickname = trimAndLowerCaseFn(req.params.nickname);
  const {
    nickname,
    email,
    robotNumber,
    coke,
    joke,
    countries,
    durians,
    likes,
  } = req.body;
  const robotInfo = {
    timestamp: new Date(),
    nickname,
    email,
    robotNumber,
    robotUrl: `https://robohash.org/${robotNumber}`,
    'favourite-color': req.body['favourite-color'],
    'favourite-series': req.body['favourite-series'],
    coke,
    joke,
    countries,
    durians,
    likes,
  };
  const newRobot = makeRobot(robotInfo);

  connectToMongoDB(async (db) => {
    const dbNickname = await db
      .collection('robotsInfo')
      .findOne({ nickname: paramsnickname });

    if (dbNickname !== null) {
      await db.collection('robotsInfo').updateOne(
        { nickname: paramsnickname },
        {
          $set: {
            timestamp: robotInfo.timestamp,
            nickname: newRobot.nickname,
            email: newRobot.email,
            robotNumber: newRobot.robotNumber,
            robotUrl: newRobot.robotUrl,
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
      res.send("Edit robot Nickname doesn't exist 🤷‍♂️");
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
      res.send("Delete Nickname doesn't exist 🤷‍♂️");
    }
  }, res);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/src/build/index.html'));
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
