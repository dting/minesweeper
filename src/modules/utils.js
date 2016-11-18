export const indexFor = function indexFor([row, col], numCols) {
  return (row * numCols) + col;
};

export const locationFor = function locationFor(index, numCols) {
  return [Math.floor(index / numCols), index % numCols];
};
