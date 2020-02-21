export const alreadyExists = (cache, data) =>
  cache.map(doc => doc.id).includes(data.id);
