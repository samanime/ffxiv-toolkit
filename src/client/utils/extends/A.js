import O from './O';

export default class A extends Array {
  static of(...props) {
    return new A(...props);
  }

  static from(arr) {
    return new A(...arr);
  }

  constructor(...props) {
    if (props.length !== 1) {
      super(...props);
    } else {
      super();
      this.push(props[0]);
    }
  }

  toListString(coordinatingConjunction = 'and', oxfordComma = true, delimiter = ', ') {
    return this.length > 1
      ? this.slice(0, -1).join(delimiter)
        + (oxfordComma ? delimiter : '')
        + coordinatingConjunction
        + ' '
        + this.slice(-1)
      : this.join(delimiter);
  }

  countEach() {
    return this.reduce((r, v) =>
      Object.assign(r, { [v]: (r[v] || 0) + 1 }),
      O.of()
    );
  }

  insertAt(index, toAdd) {
    return A.of(
      ...this.slice(0, index),
      ...[].concat(toAdd),
      ...this.slice(index + 1)
    );
  }

  remove(index, count = 1) {
    return A.of(
      ...this.slice(0, index),
      ...this.slice(index + count)
    );
  };
}