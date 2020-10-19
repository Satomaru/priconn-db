function contains(actual, expected) {
  return actual.indexOf(expected) !== -1;
}

class Matcher {

  constructor(actual) {
    this.actual = actual;
    this.matched = true;
  }

  contains(name, expected) {
    return this.match(name, expected, contains);
  }

  match(name, expected, callback) {
    if (this.matched && expected) {
      const actual = this.actual[name];

      if (!actual || !callback(actual, expected)) {
        this.matched = false;
      }
    }

    return this;
  }

  ifMatched(callback) {
    if (this.matched) {
      callback(this.actual);
    }
  }
}

module.exports = Matcher;
