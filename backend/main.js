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

// local MongoDB - get document by nickname
app.get('/my-favourites/:nickname', async (req, res) => {
  const nickname = req.params.nickname.trim().toLowerCase();
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

// local MongoDB - insert ONE document
app.post('/my-favourites/newentry', async (req, res) => {
  const newEntry = {
    nickname: 'aladdin',
    email: 'iloveprincessjasmine@gmail.com',
    'favourite-color': 'purple',
    'favourite-series': ['x', 'y', 'z'],
    coke: 0.5,
    joke: 'xyz',
    countries: 3,
    likes: 7,
  };

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

// local MongoDB - increment likes by 1
app.post('/my-favourites/:nickname/likes', async (req, res) => {
  const nickname = req.params.nickname.trim().toLowerCase();
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
