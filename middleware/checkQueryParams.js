const { check } = require('express-validator');

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

    if (extraType.includes('orderBy')) {
      if (extraType === 'orderByAsc') extraValue = [extraValue, 'asc'];
      if (extraType === 'orderByDesc') extraValue = [extraValue, 'desc'];
      extraType = 'orderBy';
    } else if (extraType === 'limit') {
      extraValue = [parseFloat(extraValue)];
    } else {
      extraValue = [extraValue];
    }

    result.push({ extraType, extraValue });

    return result;
  }, []);
}

module.exports = [
  check('pathInputs').custom(validatePaths).customSanitizer(sanitizePaths),
  check('whereInputs').custom(validateWheres).customSanitizer(sanitizeWheres),
  check('extraInputs').custom(validateExtras).customSanitizer(sanitizeExtras),
]