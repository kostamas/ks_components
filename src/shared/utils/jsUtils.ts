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
}

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
