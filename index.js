const express = require('express');
const firebase = require('firebase');
const config = require('config');

const app = express();

// init body-parser middleware
app.use(express.json({ extended: false }))

// connecting to firebase and auth
firebase.initializeApp(config.get('firebaseConfig'));
firebase.auth().signInWithEmailAndPassword(config.get('testUser'), config.get('testPassword')).then(() => console.log('Authenticated'));

app.get('/', (req, res) => res.send('API Running'));

// define routes
app.use('/api/firestore', require('./routes/api/firestore'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));