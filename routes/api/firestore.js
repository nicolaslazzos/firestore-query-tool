const express = require('express');
const firebase = require('firebase');
const moment = require('moment');

const router = express.Router();

const formatDoc = doc => {
  const data = doc.data();
  const props = Object.keys(data).sort();
  const formattedDoc = { id: doc.id, fields: {} };

  for (const prop of props) {
    let value = data[prop];
    const type = Object.keys(doc._document.objectValue.proto.mapValue.fields[prop])[0];

    if (type === 'timestampValue') value = moment(value.toDate()).format('lll');

    formattedDoc.fields[prop] = { value, type };
  }

  return formattedDoc;
}

// @route   POST api/firestore/
// @desc    get data
// @access  public
router.post('/', (req, res) => {
  const { pathInputs, whereInputs, extraInputs } = req.body;

  let query = firebase.firestore();

  pathInputs.forEach(path => {
    const { collectionName, documentId } = path;
    if (collectionName) {
      query = query.collection(collectionName.toString());
      if (documentId) {
        query = query.doc(documentId.toString());
      }
    }
  });

  whereInputs.forEach(where => {
    let { fieldName, condition, fieldType, fieldValue } = where;
    if (fieldName && condition && fieldType && fieldValue) {
      fieldValue = fieldType === 'number' ? parseInt(fieldValue) : fieldValue;
      query = query.where(fieldName.toString(), condition.toString(), fieldValue);
    }
  });

  extraInputs.forEach(extra => {
    const { extraType, extraValue } = extra;

    if (extraType && extraValue) {
      switch (extraType) {
        case 'orderByAsc':
          return query = query.orderBy(extraValue.toString(), 'asc');
        case 'orderByDesc':
          return query = query.orderBy(extraValue.toString(), 'desc');
        case 'limit':
          return query = query.limit(parseInt(extraValue));
        case 'startAt':
          return query = query.startAt(extraValue);
        case 'startAfter':
          return query = query.startAfter(extraValue);
        case 'endBefore':
          return query = query.endBefore(extraValue);
        case 'endAt':
          return query = query.endAt(extraValue);
      }
    }
  });

  query.get()
    .then(snapshot => {
      const result = [];
      snapshot.forEach(doc => result.push(formatDoc(doc)));
      res.json(result);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;