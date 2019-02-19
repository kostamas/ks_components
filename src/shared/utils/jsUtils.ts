export const deepCopy = (obj) => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  } else if (Array.isArray(obj)) {
    const clonedArr = [];
    obj.forEach((element) => {
      clonedArr.push(deepCopy(element));
    });
    return clonedArr;
  } else {
    const clonedObj = {};
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        clonedObj[prop] = deepCopy(obj[prop]);
      }
    }
    return clonedObj;
  }
};

export const deepObjectComparision = (o, p) => {
  let i;
  const keysO = Object.keys(o).sort();
  const keysP = Object.keys(p).sort();

  if (keysO.length !== keysP.length) {
    return false; // not the same nr of keys
  }
  if (keysO.join('') !== keysP.join('')) {
    return false; // different keys
  }
  for (i = 0; i < keysO.length; ++i) {
    if (o[keysO[i]] instanceof Array) {
      if (!(p[keysO[i]] instanceof Array)) {
        return false;
      }
      if (p[keysO[i]].sort().join('') !== o[keysO[i]].sort().join('')) {
        return false;
      }
    } else if (o[keysO[i]] instanceof Date) {
      if (!(p[keysO[i]] instanceof Date)) {
        return false;
      }
      if (('' + o[keysO[i]]) !== ('' + p[keysO[i]])) {
        return false;
      }
    } else if (o[keysO[i]] instanceof Function) {
      if (!(p[keysO[i]] instanceof Function)) {
        return false;
      }
    } else if (o[keysO[i]] instanceof Object) {
      if (!(p[keysO[i]] instanceof Object)) {
        return false;
      }
      if (o[keysO[i]] === o) { // self reference?
        if (p[keysO[i]] !== p) {
          return false;
        }
      } else if (deepObjectComparision(o[keysO[i]], p[keysO[i]]) === false) {
        return false; // WARNING: does not deal with circular refs other than ^^
      }
    }
    if (o[keysO[i]] !== p[keysO[i]]) { // change !== to != for loose comparison
      return false; // not the same value
    }
  }
  return true;
};

export const isEmpty = (arrayOrObject) => {
  if (Array.isArray(arrayOrObject)) {
    return arrayOrObject.length === 0;
  } else {
    return !arrayOrObject || Object.keys(arrayOrObject).length === 0;
  }
}

export const generateId = () => {
  return 'id-' + Math.random().toString(36).substr(2, 16);
};
