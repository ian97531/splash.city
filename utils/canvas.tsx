export const setRowColumn = (
  image: ImageData,
  row: number,
  column: number,
  color: number = 0,
  opacity: number = 255
) => {
  const start = row * image.width * 4 + column * 4;
  image.data[start] = color;
  image.data[start + 1] = color;
  image.data[start + 2] = color;
  image.data[start + 3] = opacity;
};

export const getRowColumn = (image: ImageData, row: number, column: number) => {
  return image.data[row * image.width * 4 + column * 4];
};

export const setOffset = (
  image: ImageData,
  offset: number,
  color: number = 0,
  opacity: number = 255
) => {
  const start = offset * 4;
  image.data[start] = color;
  image.data[start + 1] = color;
  image.data[start + 2] = color;
  image.data[start + 3] = opacity;
};

export const getOffset = (image: ImageData, offset: number) => {
  return image.data[offset * 4];
};

export const getNeighbors = (
  image: ImageData,
  row: number,
  column: number
): ReadonlyArray<{
  row: number;
  column: number;
  value: number;
}> => {
  const neighbors: Array<{
    row: number;
    column: number;
    value: number;
  }> = [];

  if (row > 0) {
    neighbors.push({
      row: row - 1,
      column,
      value: getRowColumn(image, row - 1, column),
    });

    if (column > 0) {
      neighbors.push({
        row: row - 1,
        column: column - 1,
        value: getRowColumn(image, row - 1, column - 1),
      });
      neighbors.push({
        row: row,
        column: column - 1,
        value: getRowColumn(image, row, column - 1),
      });
    }
    if (column < image.width - 1) {
      neighbors.push({
        row: row - 1,
        column: column + 1,
        value: getRowColumn(image, row - 1, column + 1),
      });
      neighbors.push({
        row: row,
        column: column + 1,
        value: getRowColumn(image, row, column + 1),
      });
    }
  }
  if (row < image.height - 1) {
    neighbors.push({
      row: row + 1,
      column,
      value: getRowColumn(image, row + 1, column),
    });

    if (column > 0) {
      neighbors.push({
        row: row + 1,
        column: column - 1,
        value: getRowColumn(image, row + 1, column - 1),
      });
    }
    if (column < image.width - 1) {
      neighbors.push({
        row: row + 1,
        column: column + 1,
        value: getRowColumn(image, row + 1, column + 1),
      });
    }
  }

  return neighbors;
};
