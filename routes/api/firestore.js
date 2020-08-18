const express = require('express');
const firebase = require('firebase');
const moment = require('moment');
const { check, validationResult } = require('express-validator');

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

const validatePaths = value => {
  value.forEach((path, i) => {
    const { collectionName, documentId } = path;

    if (!collectionName && documentId) {
      throw new Error('You specified a document ID but no collection for that document');
    } else if (i && collectionName && !value[i - 1].documentId) {
      throw new Error('You specified a subcollection but no parent document ID for that subcollection');
    }
  });

  return true;
}

const sanitizePaths = value => {
  return value.filter(path => path.collectionName);
}

const validateWheres = value => {
  value.forEach(where => {
    const { fieldName, condition, fieldType, fieldValue } = where;

    if (fieldName || condition || fieldType) {
      if (!fieldName) throw new Error('You should specify a field for the query');
      if (!condition) throw new Error('You should specify a condition for the field');
      if (!fieldType) throw new Error('You should specify a field type for the field');

      if (fieldType !== 'null' && !fieldValue) throw new Error('You should specify a value for the selected value type');
    }
  });

  return true;
}

const sanitizeWheres = value => {
  return value.reduce((result, where) => {
    let { fieldName, condition, fieldType, fieldValue } = where;

    if (!fieldName && !condition && !fieldType) return result;

    fieldValue = (fieldType === 'number') ? parseFloat(fieldValue) : fieldValue;

    result.push({ fieldName, condition, fieldType, fieldValue });

    return result;
  }, []);
}

const validateExtras = value => {
  value.forEach(extra => {
    const { extraType, extraValue } = extra;

    if (extraType || extraValue) {
      if (!extraType) throw new Error('You should specify a type for the query extra');
      if (!extraValue) throw new Error('You should specify a value for the selected query extra');
    }
  });

  return true;
}

const sanitizeExtras = value => {
  return value.reduce((result, extra) => {
    let { extraType, extraValue } = extra;

    if (!extraType && !extraValue) return result;

    extraValue = (extraType === 'limit') ? parseFloat(extraValue) : extraValue;

    result.push({ extraType, extraValue });

    return result;
  }, []);
}

// @route   POST api/firestore/
// @desc    get data
// @access  public
router.post('/', [
  check('pathInputs').custom(validatePaths).customSanitizer(sanitizePaths),
  check('whereInputs').custom(validateWheres).customSanitizer(sanitizeWheres),
  check('extraInputs').custom(validateExtras).customSanitizer(sanitizeExtras),
], async (req, res) => {
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

    if (extraType && extraValue) {
      switch (extraType) {
        case 'orderByAsc':
          return query = query.orderBy(extraValue, 'asc');
        case 'orderByDesc':
          return query = query.orderBy(extraValue, 'desc');
        case 'limit':
          return query = query.limit(extraValue);
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

  try {
    const snapshot = await query.get();
    const result = [];
    snapshot.forEach(doc => result.push(formatDoc(doc)));

    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;