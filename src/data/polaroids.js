import rope from '../assets/experience/photos/rope.webp'

/*
 * Layout of the hanging-photo strip, taken from the Figma frame (799 × 186.89px).
 * Positions are percentages of that stage so the strip scales with the card. Each entry is one polaroid
 * (frame, photo, shadow and clip rendered together from Figma's own pieces), ordered left → right.
 * `z` is Figma's paint order; `size` is the intrinsic pixel size of the exported image.
 */
export const STAGE_RATIO = '799 / 186.892'

export const ROPE = { src: rope, left: -0.091, top: -0.116, width: 99.992, height: 60.291, size: [1597, 225] }

export const POLAROIDS = [
  { left: 5.139, top: 3.079, width: 13.443, height: 86.161, z: 3, size: [321, 483] },
  { left: 20.299, top: 22.219, width: 15.423, height: 64.111, z: 4, size: [369, 357] },
  { left: 37.089, top: 12.519, width: 15.463, height: 91.661, z: 1, size: [369, 513] },
  { left: 53.819, top: 12.359, width: 13.323, height: 81.741, z: 2, size: [318, 456] },
  { left: 68.129, top: 20.829, width: 15.313, height: 62.231, z: 5, size: [366, 348] },
  { left: 83.859, top: 5.389, width: 13.173, height: 56.001, z: 6, size: [315, 312] },
]
