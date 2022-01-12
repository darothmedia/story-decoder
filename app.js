const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const users = require('./routes/api/users');
const stories = require('./routes/api/stories');
const bodyParser = require('body-parser');
// const passport = require('passport');
const path = require('path');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
}

mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('Connected to mongoDB'))
  .catch(err => console.log(err))

// var routes = require('./routes/api/users')(passport)

app.get('/', (req, res) => {
  res.send('Hello a/A!');
});

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
// app.use(passport.initialize());
// require('./config/passport')(passport);

app.use('/api/users', users)
app.use('/api/stories', stories)

const port = process.env.PORT || 8080;

app.listen(port, () => { console.log(`Listening on port ${port}`) })