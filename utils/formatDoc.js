const moment = require('moment');

module.exports = doc => {
  const data = doc.data();
  const props = Object.keys(data).sort();
  const formattedDoc = { id: doc.id, path: doc.ref.path, fields: {} };

  for (const prop of props) {
    let value = data[prop];
    const type = Object.keys(doc._document.objectValue.proto.mapValue.fields[prop])[0].replace('Value', '');

    if (type === 'timestamp') value = moment(value.toDate()).format('lll');

    formattedDoc.fields[prop] = { value, type };
  }

  return formattedDoc;
}