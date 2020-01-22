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


// @dynamic
export class JsUtils {
  static deepCopy = (obj) => {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    } else if (Array.isArray(obj)) {
      const clonedArr = [];
      obj.forEach((element) => {
        clonedArr.push(JsUtils.deepCopy(element));
      });
      return clonedArr;
    } else {
      const clonedObj = {};
      for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          clonedObj[prop] = JsUtils.deepCopy(obj[prop]);
        }
      }
      return clonedObj;
    }
  }

  static convertDataInObject = (obj: any, conditionMethod: any, actionMethod: any) => {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    } else if (Array.isArray(obj)) {
      obj.forEach(o => {
        o = JsUtils.convertDataInObject(o, conditionMethod, actionMethod);
      });
    } else {
      Object.keys(obj).forEach(o => {
        if ((typeof o !== 'object' || o === null) && conditionMethod(obj, o)) {
          actionMethod(obj, o);
        } else {
          obj[o] = JsUtils.convertDataInObject(obj[o], conditionMethod, actionMethod);
        }
      });
    }
    return obj;
  }

  static fastDeepCopy = (src) => {
    return JSON.parse(JSON.stringify(src));
  }

  static deepObjectComparision = (o, p) => {
    if (o instanceof Object && p instanceof Object && !Array.isArray(o) && !Array.isArray(p)) {
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
        if (JsUtils.deepObjectComparision(o[keysO[i]], p[keysO[i]]) === false) {
          return false;
        }
      }
    } else if (o instanceof Array) {
      if (!(p instanceof Array)) {
        return false;
      }
      const len = o.length;
      if (len !== p.length) {
        return false;
      }
      for (let a = 0; a < len; a++) {
        if (JsUtils.deepObjectComparision(o[a], p[a]) === false) {
          return false;
        }
      }
    } else if (o instanceof Date) {
      if (!(p instanceof Date)) {
        return false;
      }
      if (('' + o) !== ('' + p)) {
        return false;
      }
    } else if (o instanceof Function) {
      if (!(p instanceof Function)) {
        return false;
      }
    } else {
      return o === p;
    }
    return true;
  }

  static isEmpty = (arrayOrObject) => {
    if (Array.isArray(arrayOrObject)) {
      return arrayOrObject.length === 0;
    } else {
      return !arrayOrObject || Object.keys(arrayOrObject).length === 0;
    }
  }

  static generateId = () => {
    return 'id-' + Math.random().toString(36).substr(2, 16);
  }

  static capitalize = (str): string => str.charAt(0).toUpperCase() + str.slice(1)

  static arrayToObject = (array: any[], id: any, withCollisions?: boolean) => {
    return array.reduce((obj, item) => {
      if (withCollisions) {
        if (!obj[item[id]]) {
          obj[item[id]] = [item];
        } else {
          obj[item[id]].push(item);
        }
      } else {
        obj[item[id]] = item;
      }
      return obj;
    }, {});
  }
  static isDefined = (parameter: any) => typeof parameter !== 'undefined';

  static isDefineAndNotNull = (value: any): boolean => {
    return JsUtils.isDefined(value) && value !== null;
  }

  static undefinedToTrue = (value?: boolean): boolean => {
    return (JsUtils.isDefined(value) && value !== null) ? value : true;
  }

  static undefinedToFalse = (value?: boolean): boolean => {
    return (JsUtils.isDefined(value) && value !== null) ? value : false;
  }

  static undefinedAndNullToEmptyString = (value: string): string => {
    return (JsUtils.isDefined(value) && value !== null) ? value : '';
  }

  static getKeyByValue = (obj: any, value: any) => {
    const keys = Object.keys(obj);
    length = keys.length;
    for (let i = 0; i < length; i++) {
      if (obj[keys[i]] === value) {
        return keys[i];
      }
    }
  }

  static sortByNames = (n1: string, n2: string, desc: boolean = false) => {
    let result: number = 0;
    if (desc) {
      if (n1 > n2) {
        result = -1;
      }
      if (n1 < n2) {
        result = 1;
      }
    } else {
      if (n1 < n2) {
        result = -1;
      }
      if (n1 > n2) {
        result = 1;
      }
    }
    return result;
  }

  static sortByIds = (n1: any, n2: any, desc: boolean = false) => {
    let result: number = 0;
    if (desc) {
      if (+n1 > +n2) {
        result = -1;
      }
      if (+n1 < +n2) {
        result = 1;
      }
    } else {
      if (+n1 < +n2) {
        result = -1;
      }
      if (+n1 > +n2) {
        result = 1;
      }
    }
    return result;
  }

  static numberToLatter = (number: number, uppercase?: boolean): string => {
    return uppercase ? (number + 9).toString(36).toUpperCase() : (number + 9).toString(36);
  }

  static letterToNumber = (letter: string): number => {
    return letter.toLowerCase().charCodeAt(0) - 97;
  }

  static setElementStyle = (element, styleProps) => {
    for (const prop in styleProps) {
      if (styleProps.hasOwnProperty(prop)) {
        element.style[prop] = styleProps[prop];
      }
    }
  }

  static copyToClipboard = (value: any) => {
    const element: any = document.createElement('textarea');

    JsUtils.setElementStyle(element, {
      position: 'fixed',
      width: '0px',
      height: '0px',
      left: '-200px',
      top: '-200px'
    })

    element.value = value;

    document.body.appendChild(element);
    element.select();
    document.execCommand('Copy');

    setTimeout(() => document.body.removeChild(element));
  }
}
