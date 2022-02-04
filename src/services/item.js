export const getDefaultAttributes = (product) =>
  product.attributes
    .map((a) => ({
      [a.id]: a.items[0].id
    }))
    .reduce((a, b) => ({ ...a, ...b }), {});
