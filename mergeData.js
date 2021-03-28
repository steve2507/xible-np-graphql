'use strict';

module.exports = (data) => {
  if (data.length === 0) {
    return null;
  }

  return data.reduce((acc, cur) => {
    Object.entries(cur.data).forEach(([key, value]) => {
      const arrValue = Array.isArray(value) ? value : [value];
      if (Array.isArray(acc[key])) {
        acc[key].push(...arrValue);
      } else if (acc[key] == null) {
        acc[key] = arrValue;
      } else {
        acc[key] = [acc[key], ...arrValue];
      }
    });

    return acc;
  }, {});
};
