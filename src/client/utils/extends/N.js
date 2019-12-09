export default class N extends Number {
  static of(num = 0) {
    return new N(num);
  }

  get value() {
    return this + 0;
  }

  withCommas() {
    const whole = Math.floor(this);
    const decimal = Math.round((this - whole) * 10) / 10;

    return [...String(whole)]
      .reduce((result, digit, index, arr) => {
        const groupIndex = Math.floor(arr.length % 3 === 0
          ? index / 3
          : ((index - arr.length % 3) / 3) + 1
        );

        result[groupIndex] = (result[groupIndex] || '') + digit;

        return result;
      }, [])
      .join(',') + (decimal ? decimal.toString().slice(-2) : '');
  }
}