import $ from 'jquery';
export default function(obj1, obj2) {
  let merged = {};
  $.extend(true, merged, obj1, obj2);
  let differences = extract(obj1, merged);
  clear(differences);
  return differences;
}

function extract(obj1, obj2, diffObj) {
  diffObj = diffObj || {};
  $.each(obj2, (key, value) => {
    if (typeof value === 'object') {
      Object.defineProperty(diffObj, key, {
        configurable: true,
        enumerable: true,
        value: {},
        writable: true
      });
      extract(value, obj1[key], diffObj[key]);
    } else {
      if (value === obj1[key]) {
        diffObj[key] = value;
      }
    }
  });
  return diffObj;
}

function clear(obj) {
  $.each(obj, (key, value) => {
    if (typeof value === 'object') {
      if (Object.keys(value).length === 0) {
        delete obj[key];
        clear(obj);
      } else {
        clear(value);
      }
    }
  });
}
