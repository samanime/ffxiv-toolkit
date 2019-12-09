const standardFilters = ['main', 'header', 'nav', 'footer'];

const findUnknownElements = (node, ...excludeFilters) => {
  const self = node.constructor === HTMLElement;
  const shadowRoot = node.shadowRoot && findUnknownElements(node.shadowRoot);
  const children = Array.from(node.children).reduce((r, child) =>
    r.concat(findUnknownElements(child)), []);

  return (self ? [node] : [])
    .concat(shadowRoot || [])
    .concat(children || [])
    .filter(node =>
      excludeFilters.concat(standardFilters)
        .every(filter => !node.matches(filter))
    );
};

export default findUnknownElements;