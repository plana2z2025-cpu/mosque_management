// Deep clone function
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    const arrCopy = [];
    obj.forEach((item, index) => {
      arrCopy[index] = deepClone(item);
    });
    return arrCopy;
  }

  const objCopy = {};
  Object.keys(obj).forEach((key) => {
    objCopy[key] = deepClone(obj[key]);
  });
  return objCopy;
}

// Size function
function size(collection) {
  if (Array.isArray(collection) || typeof collection === 'string') {
    return collection.length;
  }

  if (typeof collection === 'object' && collection !== null) {
    return Object.keys(collection).length;
  }

  return 0;
}

// Function to get keys of an object
function keys(obj) {
  if (typeof obj === 'object' && obj !== null) {
    return Object.keys(obj);
  }
  return [];
}

// Function to get values of an object
function values(obj) {
  if (typeof obj === 'object' && obj !== null) {
    return Object.keys(obj).map((key) => obj[key]);
  }
  return [];
}

export default {
  deepClone,
  size,
  keys,
  values,
};
