const range = (start, end, inclusive = true) => {
  const min = Math.min(start, end);
  const max = Math.max(start, end);
  let values = [];

  for (let i = min; i < max + (inclusive ? 1 : 0); i++) {
    values.push(i);
  }

  if (min !== start) {
    values.reverse();
  }

  return values;
};

export default range;