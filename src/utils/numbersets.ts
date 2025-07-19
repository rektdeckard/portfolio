export type DecimalDigit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export const NumberSet = {
  A: {
    0: 0b0001101,
    1: 0b0011001,
    2: 0b0010011,
    3: 0b0111101,
    4: 0b0100011,
    5: 0b0110001,
    6: 0b0101111,
    7: 0b0111011,
    8: 0b0110111,
    9: 0b0001011,
    width: 7,
  } as const,
  B: {
    0: 0b0100111,
    1: 0b0110011,
    2: 0b0011011,
    3: 0b0100001,
    4: 0b0011101,
    5: 0b0111001,
    6: 0b0000101,
    7: 0b0010001,
    8: 0b0001001,
    9: 0b0010111,
    width: 7,
  } as const,
  C: {
    0: 0b1110010,
    1: 0b1100110,
    2: 0b1101100,
    3: 0b1000010,
    4: 0b1011100,
    5: 0b0101110,
    6: 0b1010000,
    7: 0b1000100,
    8: 0b1001000,
    9: 0b1110100,
    width: 7,
  } as const,
} as const;

export const AuxiliaryCharacter = {
  NormalGuardBar: {
    RIGHT: 0b101,
    LEFT: 0b101,
    width: 3,
  } as const,
  CentreGuardBar: {
    CENTRE: 0b01010,
    width: 5,
  },
  UPCE: {
    RIGHT: 0b010101,
    width: 6,
  } as const,
} as const;

export const EAN13EncodingPatterns: { [key in DecimalDigit]: ("A" | "B")[] } = {
  0: ["A", "A", "A", "A", "A", "A"],
  1: ["A", "A", "B", "A", "B", "B"],
  2: ["A", "A", "B", "B", "A", "B"],
  3: ["A", "A", "B", "B", "B", "A"],
  4: ["A", "B", "A", "A", "B", "B"],
  5: ["A", "B", "B", "A", "A", "B"],
  6: ["A", "B", "B", "B", "A", "A"],
  7: ["A", "B", "A", "B", "A", "B"],
  8: ["A", "B", "A", "B", "B", "A"],
  9: ["A", "B", "B", "A", "B", "A"],
} as const;
