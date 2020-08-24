const express = require('express');
const firebase = require('firebase');
const { validationResult, body } = require('express-validator');
const formatDoc = require('../../utils/formatDoc');
const checkQueryParams = require('../../middleware/checkQueryParams');

const router = express.Router();

// @route   POST api/firestore/auth
// @desc    login into firebase
// @access  public
router.post('/auth', [
  body('email').notEmpty().withMessage('Email si required').isEmail().withMessage('You should input a valid email address'),
  body('password').notEmpty().withMessage('Password si required')
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);

    res.json({ user: firebase.auth().currentUser });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

// @route   POST api/firestore/app
// @desc    add a firebase app
// @access  public
router.post('/app', [
  body('firebaseConfiguration').notEmpty().withMessage('You should provide a firebase configuration object')
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { firebaseConfiguration } = req.body;

  try {
    firebase.initializeApp(JSON.parse(firebaseConfiguration));

    res.json({ connected: !!firebase.apps.length });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

// @route   DELETE api/firestore/app
// @desc    remove a firebase app
// @access  public
router.delete('/app', async (req, res) => {
  try {
    await firebase.app().delete();

    res.json({ connected: !!firebase.apps.length });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

// @route   POST api/firestore/
// @desc    get data
// @access  public
router.post('/', checkQueryParams, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { pathInputs, whereInputs, extraInputs } = req.body;

  let query = firebase.firestore();

  pathInputs.forEach(path => {
    const { collectionName, documentId } = path;
    query = query.collection(collectionName);
    if (documentId) query = query.doc(documentId);
  });

  whereInputs.forEach(where => {
    let { fieldName, condition, fieldValue } = where;
    query = query.where(fieldName, condition, fieldValue);
  });

  extraInputs.forEach(extra => {
    const { extraType, extraValue } = extra;
    query = query[extraType](...extraValue);
  });

  try {
    const snapshot = await query.get();
    const result = [];

    if (!snapshot.docs) result.push(formatDoc(snapshot));
    else snapshot.forEach(doc => result.push(formatDoc(doc)));

    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

// @route   POST api/firestore/delete
// @desc    delete documents
// @access  public
router.post('/delete', async (req, res) => {
  const { paths } = req.body;

  let query = firebase.firestore();

  try {
    for (let path of paths) {
      await query.doc(path).delete();
    }

    res.json(paths);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;