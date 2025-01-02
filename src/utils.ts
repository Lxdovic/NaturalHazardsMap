export const toQuadKey = (x: number, y: number, z: number) => {
  let index = "";

  for (let i = z; i > 0; i--) {
    let b = 0;
    const mask = 1 << (i - 1);

    if ((x & mask) !== 0) b++;
    if ((y & mask) !== 0) b += 2;

    index += b.toString();
  }

  return index;
};
