export function adjustColor(color: string, percent: number) {
  let R = parseInt(color.substring(1, 3), 16)
  let G = parseInt(color.substring(3, 5), 16)
  let B = parseInt(color.substring(5, 7), 16)

  if (R == 0) R = 32
  if (G == 0) G = 32
  if (B == 0) B = 32

  R = Math.round((R * (100 + percent)) / 100)
  G = Math.round((G * (100 + percent)) / 100)
  B = Math.round((B * (100 + percent)) / 100)

  R = R < 255 ? R : 255
  G = G < 255 ? G : 255
  B = B < 255 ? B : 255

  const RR = R.toString(16).length == 1 ? '0' + R.toString(16) : R.toString(16)
  const GG = G.toString(16).length == 1 ? '0' + G.toString(16) : G.toString(16)
  const BB = B.toString(16).length == 1 ? '0' + B.toString(16) : B.toString(16)

  return '#' + RR + GG + BB
}
