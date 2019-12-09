import A from './A';

export default class O {
  static of(obj) {
    return new O(obj);
  }

  static merge(objArr) {
    return objArr.reduce((result, obj) =>
      Object.assign(result, Array.isArray(obj) ? { [obj[0]]: obj[1] } : obj),
      O.of()
    );
  }

  constructor(obj = {}) {
    Object.entries(obj).forEach(([key, value]) =>
      this[key] = value
    );
  }

  keys() {
    return A.from(Object.keys(this));
  }

  values() {
    return A.from(Object.values(this));
  }

  entries() {
    return A.from(Object.entries(this));
  }

  map(callback) {
    return O.merge(
      this.entries().map(([key, value]) =>
        callback(key, value)
      )
    );
  }

  filter(callback) {
    return O.merge(
      Object.entries(this).filter(([key, value]) =>
        callback(key, value)
      )
    );
  }
}