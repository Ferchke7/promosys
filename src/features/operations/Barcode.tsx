"use client";

interface BarcodeProps {
  value: string;
  height?: number;
  showText?: boolean;
}

const patterns: Record<string, string> = {
  "0": "nnwwnwnnn", "1": "wnnwnnnnw", "2": "nnwwnnnnw", "3": "wnwwnnnnn", "4": "nnnwwnnnw",
  "5": "wnnwwnnnn", "6": "nnwwwnnnn", "7": "nnnwnnwnw", "8": "wnnwnnwnn", "9": "nnwwnnwnn",
  A: "wnnnnwnnw", B: "nnwnnwnnw", C: "wnwnnwnnn", D: "nnnnwwnnw", E: "wnnnwwnnn",
  F: "nnwnwwnnn", G: "nnnnnwwnw", H: "wnnnnwwnn", I: "nnwnnwwnn", J: "nnnnwwwnn",
  K: "wnnnnnnww", L: "nnwnnnnww", M: "wnwnnnnwn", N: "nnnnwnnww", O: "wnnnwnnwn",
  P: "nnwnwnnwn", Q: "nnnnnnwww", R: "wnnnnnwwn", S: "nnwnnnwwn", T: "nnnnwnwwn",
  U: "wwnnnnnnw", V: "nwwnnnnnw", W: "wwwnnnnnn", X: "nwnnwnnnw", Y: "wwnnwnnnn",
  Z: "nwwnwnnnn", "-": "nwnnnnwnw", ".": "wwnnnnwnn", " ": "nwwnnnwnn", "$": "nwnwnwnnn",
  "/": "nwnwnnnwn", "+": "nwnnnwnwn", "%": "nnnwnwnwn", "*": "nwnnwnwnn",
};

function normalize(value: string) {
  return value.toUpperCase().replace(/[^0-9A-Z. $/+%-]/g, "-");
}

export function Barcode({ value, height = 34, showText = true }: BarcodeProps) {
  const text = normalize(value);
  const encoded = `*${text}*`;
  const narrow = 1.35;
  const wide = 3.35;
  const gap = narrow;
  const quiet = 8;
  let cursor = quiet;
  const bars: Array<{ x: number; width: number }> = [];

  for (const character of encoded) {
    const pattern = patterns[character] ?? patterns["-"];
    for (let index = 0; index < pattern.length; index += 1) {
      const width = pattern[index] === "w" ? wide : narrow;
      if (index % 2 === 0) bars.push({ x: cursor, width });
      cursor += width;
    }
    cursor += gap;
  }

  const textHeight = showText ? 15 : 0;
  return <svg role="img" aria-label={`Barcode ${text}`} viewBox={`0 0 ${cursor + quiet} ${height + textHeight}`} preserveAspectRatio="none">
    <rect width="100%" height="100%" fill="white" />
    {bars.map((bar, index) => <rect key={`${bar.x}-${index}`} x={bar.x} y="0" width={bar.width} height={height} fill="#101827" />)}
    {showText && <text x={(cursor + quiet) / 2} y={height + 11} textAnchor="middle" fontSize="8" fontFamily="monospace" letterSpacing="1.2" fill="#26364b">{text}</text>}
  </svg>;
}
