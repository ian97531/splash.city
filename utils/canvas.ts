export enum Color {
  White = 255,
  Black = 0,
}

export enum Opacity {
  Opaque = 255,
  Transparent = 0,
}

const getIndexForRowColumn = (
  image: ImageData,
  row: number,
  column: number
): number => {
  return row * image.width * 4 + column * 4;
};

const getIndexForOffset = (image: ImageData, offset: number): number => {
  return offset * 4;
};

export const getOffset = (image: ImageData, offset: number) => {
  return image.data[getIndexForOffset(image, offset)];
};

export const getRowColumn = (image: ImageData, row: number, column: number) => {
  return image.data[getIndexForRowColumn(image, row, column)];
};

export const setRowColumn = (
  image: ImageData,
  row: number,
  column: number,
  color: number = Color.Black,
  opacity: number = Opacity.Opaque
) => {
  const index = getIndexForRowColumn(image, row, column);
  image.data[index] = color;
  image.data[index + 1] = color;
  image.data[index + 2] = color;
  image.data[index + 3] = opacity;
};

export const setOffset = (
  image: ImageData,
  offset: number,
  color: number = Color.Black,
  opacity: number = Opacity.Opaque
) => {
  const index = getIndexForOffset(image, offset);
  image.data[index] = color;
  image.data[index + 1] = color;
  image.data[index + 2] = color;
  image.data[index + 3] = opacity;
};

export const setAll = (
  image: ImageData,
  color: number = Color.Black,
  opacity: number = Opacity.Opaque
) => {
  const { width, height } = image;
  for (let row = 0; row < height; row++) {
    for (let column = 0; column < width; column++) {
      setRowColumn(image, row, column, color, opacity);
    }
  }
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

  if (column < image.width - 1) {
    neighbors.push({
      row: row,
      column: column + 1,
      value: getRowColumn(image, row, column + 1),
    });
  }

  if (row < image.height - 1) {
    neighbors.push({
      row: row + 1,
      column,
      value: getRowColumn(image, row + 1, column),
    });

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
