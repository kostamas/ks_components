import {JsUtils} from './jsUtils';
import {isNumber} from 'util';

// @dynamic
export class InputUtils {
  static displayFormatNameAndIdOrEmptyString = (name: string, id: any): string => {
    let idName: string = '';
    if (isNumber(id)) {
      idName = JsUtils.isDefineAndNotNull(id) ? ` (${id})` : '';
    } else {
      idName = JsUtils.undefinedAndNullToEmptyString(id) !== '' ? ` (${id})` : '';
    }
    return `${JsUtils.undefinedAndNullToEmptyString(name)}${idName}`;
  };

  static multipleNamesOrIdTextHandler = (byId?: boolean) => (selectedOption: any, optionsList: any[]) => {
    let text: string = '';
    optionsList.forEach(option => {
      if (option.isSelected && option.id !== 'All') {
        if (text) {
          text += ', ' + (byId ? option.id : option.name);
        } else {
          text = byId ? option.id : option.name;
        }
      }
    });
    return text;
  }

  static numberOnly = (event: any): boolean => {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  static isRangeValue = (event: any, minValue: number, maxValue: number, isFloat: boolean = false): boolean => {
    const charCode = event.which ? event.which : event.keyCode;
    let result = true;
    if (!InputUtils.numberOnly(event) && charCode === 46 && !isFloat) {
      result = false;
    }
    const cursorPoint: number = event.srcElement.selectionStart;
    let value: string;
    if (cursorPoint === 0) { // start of string
      value = event.key + event.srcElement.value;
    } else if (cursorPoint < event.srcElement.value.length) { //middle of string
      value = event.srcElement.value.toString().slice(0, cursorPoint) + event.key.toString() + event.srcElement.value.toString().slice(cursorPoint);
    } else { // end of string
      value = event.srcElement.value + event.key;
    }
    const numValue: number = isFloat ? parseFloat(value) : Number(value);
    if (value.length > 1 && value.length <= 2 && value.charCodeAt(0) === 48 && charCode !== 46) {
      result = false;
    } else if (charCode === 46 && value.split('.').length - 1 > 1 || value[0] === '.') {
      result = false;
    } else if (JsUtils.isDefineAndNotNull(maxValue) && charCode === 46 && numValue >= maxValue) {
      result = false;
    } else if (charCode !== 46 && !InputUtils.numberOnly(event)) {
      result = false;
    }

    if (numValue === undefined || isNaN(numValue)) {
      result = false;
    }
    if ((JsUtils.isDefineAndNotNull(minValue) && numValue < minValue) || (JsUtils.isDefineAndNotNull(maxValue) && numValue > maxValue)) {
      result = false;
    }
    return result;
  }

  static preventPasteValue = (): boolean => {
    return false;
  }

}
