const apiUtils = {
  toArray: (value) => (Array.isArray(value)) ? value : [value],

  isNullish: (value) => value === null || value === undefined,

  compare: (value1, value2) => {
    const nullishValue1 = apiUtils.isNullish(value1);
    const nullishValue2 = apiUtils.isNullish(value2);

    if (nullishValue1) {
      return (nullishValue2) ? 0 : -1;
    }

    if (nullishValue2) {
      return 1;
    }

    if (value1 === value2) {
      return 0;
    }

    return (value1 < value2) ? -1: 1;
  },

  containsOneOf: (array, ...oneOf) => {
    const expected = oneOf.flat();
    return array.some((value) => expected.includes(value));
  }
}

module.exports = apiUtils;
