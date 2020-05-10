import firebase from 'firebase';
import {
  ON_DATA_READING,
  ON_DATA_READ,
  ON_DATA_READ_FAIL
} from './types';

export const onDataRead = ({ pathInputs, whereInputs, extraInputs }) => dispatch => {
  dispatch({ type: ON_DATA_READING });

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
      snapshot.forEach(doc => {
        const { name, calories, fat, carbs, protein } = doc.data();
        result.push({ _id: doc.id, name, calories, fat, carbs, protein });
      });

      dispatch({ type: ON_DATA_READ, payload: result });
    })
    .catch(error => {
      console.error(error.message);
      dispatch({ type: ON_DATA_READ_FAIL, payload: error });
    });
}