export const deepCopy = (obj) => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  } else if (Array.isArray(obj)) {
    const clonedArr = [];
    obj.forEach(function (element) {
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

export const isEmpty = (arrayOrObject) => {
  if (!arrayOrObject) {
    return true;
  }
  else {
    return Array.isArray(arrayOrObject) ? arrayOrObject.length : Object.keys(arrayOrObject).length;
  }
};

export const isDefineAndNotNull = (value: any): boolean => {
  return isDefined(value) && value !== null;
}

export const isDefined = (parameter: any) => typeof parameter !== 'undefined';

