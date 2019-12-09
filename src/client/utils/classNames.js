const classNames = (...props) =>
  props.reduce((classes, prop) =>
    [
      ...classes,
      ...(typeof prop === 'object'
        ? Object.keys(prop)
          .filter(key => prop[key])
        : Array.isArray(prop)
          ? prop
          : [prop]
      ).map(p => p.trim())
        .filter(Boolean)
    ], []
  ).join(' ');

export default classNames;